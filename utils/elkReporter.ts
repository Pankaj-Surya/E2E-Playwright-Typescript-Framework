import { FullConfig, Reporter, TestCase, TestResult, Suite } from '@playwright/test/reporter';
import { ElkLogger } from '../utils/ElkLogger';
import { logToFile } from './logger';

class ElkReporter implements Reporter {
    async onBegin(config, suite: Suite) {
        const allTests = await suite.allTests();
        console.log(`⚡Custom Reporter Found ${allTests.length} tests`);
    }
    async onTestEnd(test: TestCase, result: TestResult) {
        const testName = test.title + ' > ';
        const status = result.status;
        await ElkLogger.sendLog({ test, result });
        console.log('Test started:', test.title);
        logToFile({
            event: 'test-end',
            timestamp: new Date().toISOString(),
            test_suite: test.parent?.title || 'Unknown Suite',
            test_case_name: test.title,
            test_status: result.status,
            duration_ms: result.duration,
            // browser: result?.use?.browserName || 'unknown',
            // device: result.project?.use?.viewport?.name || 'desktop',
            retry_count: result.retry,
            error_message: result.error?.message || '',
            tags: test.annotations.map(a => a.type), // If you're using annotations/tags
            env: process.env.TEST_ENV || 'local',
            build_id: process.env.BUILD_ID || 'manual',
            log_level: result.status === 'failed' ? 'error' : 'info'
        });
    }
}

export default ElkReporter;
