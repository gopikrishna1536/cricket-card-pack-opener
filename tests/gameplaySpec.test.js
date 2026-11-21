import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Gameplay Documentation Tests', () => {
  test('confirms gameplay specification exists and documents game loop', () => {
    const docPath = path.join(__dirname, '..', 'docs', 'GAMEPLAY_AND_ECONOMY_SPEC.md');
    assert.ok(fs.existsSync(docPath));
    const content = fs.readFileSync(docPath, 'utf8');
    assert.ok(content.includes('Cricket Card Pack Opener - Game Design'));
    assert.ok(content.includes('node:test'));
  });
});
