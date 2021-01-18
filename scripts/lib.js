/* global module */

module.exports.joinPaths = (path1, path2) => {
    let finalPath = path1;

    if (path1.substr(path1.length - 1) !== '/') {
        finalPath += '/';
    }

    if (path2.slice(0, 1) === '/') {
        finalPath += path2.slice(1);
    } else {
        finalPath += path2;
    }

    return finalPath;
};
