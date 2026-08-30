const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testGame() {
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();
    
    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    // Listen for console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('❌ JS ERROR:', msg.text());
        }
    });
    
    page.on('pageerror', error => {
        console.log('❌ PAGE ERROR:', error.message);
    });
    
    let screenshotCounter = 0;
    async function takeScreenshot(name) {
        screenshotCounter++;
        const filename = `${String(screenshotCounter).padStart(3, '0')}_${name}.png`;
        const filepath = path.join(screenshotsDir, filename);
        await page.screenshot({ path: filepath, fullPage: true });
        console.log(`📸 Screenshot: ${filename}`);
    }
    
    try {
        console.log('🌐 Loading game...');
        await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle', timeout: 30000 });
        await takeScreenshot('01_initial_load');
        
        // Wait for the game to initialize
        await page.waitForTimeout(2000);
        await takeScreenshot('02_after_init');
        
        // Check current passage tags
        const storyTags = await page.evaluate(() => {
            const story = document.querySelector('tw-story');
            return story ? story.getAttribute('tags') : 'none';
        });
        console.log(`📋 Current story tags: ${storyTags}`);
        
        // ===== TRIAL PREPARATION SCREEN =====
        console.log('\n🎮 Testing Trial Preparation Screen...');
        
        // Test trial menu buttons
        const trialCluesBtn = await page.$('button[onclick="openTrialClues()"]');
        if (trialCluesBtn) {
            console.log('✅ Found "View Clues" button');
            await trialCluesBtn.click();
            await page.waitForTimeout(1000);
            await takeScreenshot('03_trial_clues_modal');
            
            // Close clue modal
            const closeBtn = await page.$('.clue-modal-close, .clue-modal-close-btn');
            if (closeBtn) {
                await closeBtn.click();
                await page.waitForTimeout(500);
                await takeScreenshot('04_trial_clues_closed');
            }
        } else {
            console.log('❌ Trial clues button not found');
        }
        
        const trialSaveBtn = await page.$('button[onclick="openTrialSave()"]');
        if (trialSaveBtn) {
            console.log('✅ Found "Save Progress" button');
            await trialSaveBtn.click();
            await page.waitForTimeout(1000);
            await takeScreenshot('05_trial_save_modal');
            
            // Close save modal - try to find close button
            const saveCloseBtn = await page.$('.save-modal-close, .modal-close, button:has-text("Закрыть"), button:has-text("Close")');
            if (saveCloseBtn) {
                await saveCloseBtn.click();
                await page.waitForTimeout(500);
            } else {
                // Try clicking outside or ESC
                await page.keyboard.press('Escape');
                await page.waitForTimeout(500);
            }
            await takeScreenshot('06_trial_save_closed');
        } else {
            console.log('❌ Trial save button not found');
        }
        
        // Click "НАЧАТЬ КЛАССНЫЙ СУД" button to proceed
        const proceedBtn = await page.$('.trial-proceed');
        if (proceedBtn) {
            console.log('✅ Found "Start Trial" button');
            await proceedBtn.click();
            await page.waitForTimeout(3000); // Wait for transition
            await takeScreenshot('07_after_trial_start');
        } else {
            console.log('❌ Proceed button not found, trying hidden link...');
            // Try the hidden link
            const hiddenLink = await page.$('#trial-real-link tw-link, #trial-real-link .tw-link');
            if (hiddenLink) {
                await hiddenLink.click();
                await page.waitForTimeout(3000);
                await takeScreenshot('07_after_trial_start');
            }
        }
        
        // ===== TRIAL DAWN / GAMEPLAY =====
        await page.waitForTimeout(2000);
        
        // Check new passage tags
        const newStoryTags = await page.evaluate(() => {
            const story = document.querySelector('tw-story');
            return story ? story.getAttribute('tags') : 'none';
        });
        console.log(`📋 New story tags: ${newStoryTags}`);
        
        await takeScreenshot('08_trial_dawn_loaded');
        
        // Now test regular game UI buttons (should be visible in trial-dawn)
        console.log('\n🔍 Testing Regular Game UI...');
        
        // Check mute button
        const muteBtn = await page.$('#mute-toggle-btn');
        if (muteBtn) {
            console.log('✅ Found mute button');
            const isVisible = await muteBtn.isVisible();
            console.log(`   Visible: ${isVisible}`);
            if (isVisible) {
                await muteBtn.click();
                await page.waitForTimeout(500);
                await takeScreenshot('09_mute_toggled');
                await muteBtn.click();
                await page.waitForTimeout(500);
                await takeScreenshot('10_mute_toggled_back');
            }
        } else {
            console.log('❌ Mute button not found');
        }
        
        // Check clue button
        const clueBtn = await page.$('#clue-button');
        if (clueBtn) {
            console.log('✅ Found clue button');
            const isVisible = await clueBtn.isVisible();
            console.log(`   Visible: ${isVisible}`);
            if (isVisible) {
                await clueBtn.click();
                await page.waitForTimeout(1000);
                await takeScreenshot('11_clue_modal_open');
                
                // Check clue items
                const clueItems = await page.$$('.clue-modal-item');
                console.log(`   Found ${clueItems.length} clue items`);
                for (let i = 0; i < Math.min(clueItems.length, 3); i++) {
                    await clueItems[i].click();
                    await page.waitForTimeout(300);
                    await takeScreenshot(`12_clue_item_${i}`);
                }
                
                // Close clue modal
                const closeBtn = await page.$('.clue-modal-close, .clue-modal-close-btn');
                if (closeBtn) {
                    await closeBtn.click();
                    await page.waitForTimeout(500);
                    await takeScreenshot('13_clue_modal_closed');
                }
            }
        } else {
            console.log('❌ Clue button not found');
        }
        
        // Check save button
        const saveBtn = await page.$('#save-button');
        if (saveBtn) {
            console.log('✅ Found save button');
            const isVisible = await saveBtn.isVisible();
            console.log(`   Visible: ${isVisible}`);
            if (isVisible) {
                await saveBtn.click();
                await page.waitForTimeout(1000);
                await takeScreenshot('14_save_modal');
            }
        } else {
            console.log('❌ Save button not found');
        }
        
        // Check game menu
        const menuBtn = await page.$('#game-menu-btn');
        if (menuBtn) {
            console.log('✅ Found game menu button');
            const isVisible = await menuBtn.isVisible();
            console.log(`   Visible: ${isVisible}`);
            if (isVisible) {
                await menuBtn.click();
                await page.waitForTimeout(1000);
                await takeScreenshot('15_game_menu_open');
                
                // Check menu items
                const menuItems = await page.$$('#game-menu-panel button, #game-menu-panel a');
                console.log(`   Found ${menuItems.length} menu items`);
                for (let i = 0; i < Math.min(menuItems.length, 5); i++) {
                    const text = await menuItems[i].textContent();
                    console.log(`   Menu item ${i}: ${text.trim()}`);
                }
                
                // Close menu by clicking outside
                await page.click('body', { position: { x: 10, y: 10 } });
                await page.waitForTimeout(500);
            }
        } else {
            console.log('❌ Game menu button not found');
        }
        
        // Check for links in the passage (main game mechanics)
        console.log('\n🔍 Checking passage links...');
        const links = await page.$$('tw-link, .tw-link');
        console.log(`Found ${links.length} links in passage`);
        for (let i = 0; i < Math.min(links.length, 5); i++) {
            const text = await links[i].textContent();
            console.log(`   Link ${i}: ${text.trim()}`);
        }
        
        // Click first link if available
        if (links.length > 0) {
            await links[0].click();
            await page.waitForTimeout(1500);
            await takeScreenshot('16_after_first_link_click');
        }
        
        // Check for any layout issues
        console.log('\n🔍 Checking for layout issues...');
        const overlapping = await page.evaluate(() => {
            const elements = document.querySelectorAll('button, a, tw-link, .tw-link, #clue-button, #mute-toggle-btn, #save-button, #game-menu-btn, .trial-proceed, .trial-btn-solid');
            const issues = [];
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                // Check if element is off-screen
                if (rect.right < 0 || rect.left > window.innerWidth || rect.bottom < 0 || rect.top > window.innerHeight) {
                    issues.push(`${el.tagName}#${el.id || el.className} is off-screen`);
                }
                // Check for zero size
                if (rect.width === 0 || rect.height === 0) {
                    issues.push(`${el.tagName}#${el.id || el.className} has zero size`);
                }
            });
            return issues;
        });
        
        if (overlapping.length > 0) {
            console.log('⚠️ Layout issues found:');
            overlapping.forEach(issue => console.log(`   - ${issue}`));
        } else {
            console.log('✅ No obvious layout issues detected');
        }
        
        // Final screenshot
        await takeScreenshot('99_final_state');
        
    } catch (error) {
        console.error('❌ Test error:', error);
        await takeScreenshot('error_state');
    }
    
    await browser.close();
    console.log('\n✅ Test complete!');
}

testGame().catch(console.error);