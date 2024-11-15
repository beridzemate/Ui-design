import { GLOBAL_OBJ } from './worldwide.js';

const debugIdStackParserCache = new WeakMap();

/**
 * Returns a map of filenames to debug identifiers.
 */
function getFilenameToDebugIdMap(stackParser) {
  const debugIdMap = GLOBAL_OBJ._sentryDebugIds;
  if (!debugIdMap) {
    return {};
  }

  let debugIdStackFramesCache;
  const cachedDebugIdStackFrameCache = debugIdStackParserCache.get(stackParser);
  if (cachedDebugIdStackFrameCache) {
    debugIdStackFramesCache = cachedDebugIdStackFrameCache;
  } else {
    debugIdStackFramesCache = new Map();
    debugIdStackParserCache.set(stackParser, debugIdStackFramesCache);
  }

  // Build a map of filename -> debug_id.
  return Object.keys(debugIdMap).reduce((acc, debugIdStackTrace) => {
    let parsedStack;

    const cachedParsedStack = debugIdStackFramesCache.get(debugIdStackTrace);
    if (cachedParsedStack) {
      parsedStack = cachedParsedStack;
    } else {
      parsedStack = stackParser(debugIdStackTrace);
      debugIdStackFramesCache.set(debugIdStackTrace, parsedStack);
    }

    for (let i = parsedStack.length - 1; i >= 0; i--) {
      const stackFrame = parsedStack[i];
      const file = stackFrame && stackFrame.filename;

      if (stackFrame && file) {
        acc[file] = debugIdMap[debugIdStackTrace] ;
        break;
      }
    }
    return acc;
  }, {});
}

/**
 * Returns a list of debug images for the given resources.
 */
function getDebugImagesForResources(
  stackParser,
  resource_paths,
) {
  const filenameDebugIdMap = getFilenameToDebugIdMap(stackParser);

  const images = [];
  for (const path of resource_paths) {
    if (path && filenameDebugIdMap[path]) {
      images.push({
        type: 'sourcemap',
        code_file: path,
        debug_id: filenameDebugIdMap[path] ,
      });
    }
  }

  return images;
}

export { getDebugImagesForResources, getFilenameToDebugIdMap };
//# sourceMappingURL=debug-ids.js.map
