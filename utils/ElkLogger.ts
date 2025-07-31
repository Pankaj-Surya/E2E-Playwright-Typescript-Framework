import { request } from '@playwright/test';
import { TestCase, TestResult } from '@playwright/test/reporter';
// const SEND_LOGS_TO_ELK = process.env.SEND_LOGS_TO_ELK ?? 'yes';
const SEND_LOGS_TO_ELK = 'yes';
const ELK_URL = process.env.ELK_URL ?? 'http://localhost:9200/playwright-automation-logs/_doc';
const DELETE_URL = 'http://localhost:9200/playwright-automation-logs/_delete_by_query';

export class ElkLogger {
    static async sendLog({ test, result }: { test: TestCase; result: TestResult }): Promise<void> {
        if (SEND_LOGS_TO_ELK.toLowerCase() !== 'yes') return;

        // const logData = {
        //   testName,
        //   status,
        //   executionTime: new Date().toISOString(),
        // };

        const logData = {
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
        };


        const requestContext = await request.newContext();
        const response = await requestContext.post(ELK_URL, {
            data: logData,
        });

        if (response.status() !== 201) {
            console.error('Failed to send log to ELK:', await response.text());
        } else {
            console.error('Succefully  to send log to ELK:', await response.text());
        }

        await requestContext.dispose();
    }

    static async deleteAllLogs(): Promise<void> {
        if (SEND_LOGS_TO_ELK.toLowerCase() !== 'yes') return;

        const requestContext = await request.newContext();
        const response = await requestContext.post(DELETE_URL, {
            data: {
                query: {
                    match_all: {},
                },
            },
        });

        if (response.status() !== 200) {
            console.error('Failed to delete logs:', await response.text());
        }

        await requestContext.dispose();
    }


    static async getLogs(query: object = {}): Promise<any[]> {
        if (SEND_LOGS_TO_ELK.toLowerCase() !== 'yes') return [];

        const requestContext = await request.newContext();
        const response = await requestContext.post(`${ELK_URL.replace('/_doc', '')}/_search`, {
            data: {
                size: 100, // adjust as needed
                query: query || { match_all: {} },
                sort: [{ "timestamp": { "order": "desc" } }]
            }
        });

        if (response.status() !== 200) {
            console.error('Failed to fetch logs:', await response.text());
            await requestContext.dispose();
            return [];
        }

        const json = await response.json();
        const hits = json.hits?.hits ?? [];

        await requestContext.dispose();
        return hits.map((hit: any) => hit._source);
    }

}
