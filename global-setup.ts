// import { test as setup } from '@playwright/test';
import { ElkLogger } from './utils/ElkLogger';
import fs from 'fs'
import { glob } from 'glob'

async function globalSetup() {

    //   await ElkLogger.deleteAllLogs();
    console.log('📥 Fetching logs before deletion...');
    const logsBeforeDelete = await ElkLogger.getLogs();

    console.log(`🔢 Logs found before delete: ${logsBeforeDelete.length}`);
    if (logsBeforeDelete.length > 0) {
        console.log('🪵 Sample log entry:', logsBeforeDelete[0]); // optional
    }

    console.log('🧹 Deleting all old logs...');
    await ElkLogger.deleteAllLogs();

    console.log('✅ Logs deleted. Proceeding with test execution...');

}

export default globalSetup;

// setup("Delete All ELk Logs",async()=>{
//   await ElkLogger.deleteAllLogs();
// })
