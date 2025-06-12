import { expect } from 'vitest';
import * as matchers from 'jest-extended';
import * as jestDom from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
expect.extend(jestDom);