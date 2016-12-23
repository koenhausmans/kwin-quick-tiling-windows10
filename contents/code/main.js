/*******************************************************************************
 * Quick Tiling Extensions
 *
 * A Script for KWin - the KDE window manager
 *
 * This script will add two additional shortcuts to the KWin window manager,
 * they will change the Win+Up and Win+Down behavior similar to the 2x2 snap
 * feature newly introduced in Windows 10.
 *
 * Copyright (C) 2016 Koen Hausmans <koen@hausmans.nl>
 ******************************************************************************/

function _GetCurrentScreenGeometry() {
    return workspace.clientArea(KWin.PlacementArea, workspace.activeScreen, workspace.currentDesktop);
}

function _GetClientGeometryOnCurrentScreen() {
    var clientGeometry = workspace.activeClient.geometry;
    var screenGeometry = _GetCurrentScreenGeometry();
    clientGeometry.x -= screenGeometry.x;
    clientGeometry.y -= screenGeometry.y;
    return clientGeometry;
}

function _IsCurrentWindowVerticallyMaximized() {
    var screenGeometry = _GetCurrentScreenGeometry();
    var clientGeometry = _GetClientGeometryOnCurrentScreen();
    if (clientGeometry.height == screenGeometry.height) {
        return true;
    }

    return false
}

function _IsWindowTiledToTop() {
    var screenGeometry = _GetCurrentScreenGeometry();
    var clientGeometry = _GetClientGeometryOnCurrentScreen();
    if (clientGeometry.height == (screenGeometry.height / 2) && clientGeometry.y == 0) {
        return true;
    }

    return false;
}

function _IsWindowTiledToBottom() {
    var screenGeometry = _GetCurrentScreenGeometry();
    var clientGeometry = _GetClientGeometryOnCurrentScreen();
    if (clientGeometry.height == (screenGeometry.height / 2) && clientGeometry.y == (screenGeometry.height / 2)) {
        return true;
    }

    return false;
}

function _IsWindowTiledToLeft() {
    var screenGeometry = _GetCurrentScreenGeometry();
    var clientGeometry = _GetClientGeometryOnCurrentScreen();
    if (clientGeometry.width == (screenGeometry.width / 2) && clientGeometry.x == 0) {
        return true;
    }

    return false;
}

function _IsWindowTiledToRight() {
    var screenGeometry = _GetCurrentScreenGeometry();
    var clientGeometry = _GetClientGeometryOnCurrentScreen();
    if (clientGeometry.width == (screenGeometry.width / 2) && clientGeometry.x == (screenGeometry.width / 2)) {
        return true;
    }

    return false;
}

var QuickTileUpwards = function() {
    if (_IsWindowTiledToLeft()) {
        if (_IsWindowTiledToTop()) {
            workspace.slotWindowMaximize();
        } else if (_IsCurrentWindowVerticallyMaximized()) {
            workspace.slotWindowQuickTileTopLeft();
        } else if (_IsWindowTiledToBottom()) {
            workspace.slotWindowQuickTileLeft();
        }
    } else if (_IsWindowTiledToRight()) {
        if (_IsWindowTiledToTop()) {
            workspace.slotWindowMaximize();
        } else if (_IsCurrentWindowVerticallyMaximized()) {
            workspace.slotWindowQuickTileTopRight();
        } else if (_IsWindowTiledToBottom()) {
            workspace.slotWindowQuickTileRight();
        }
    } else {
        workspace.slotWindowMaximize();
    }
}

var QuickTileDownwards = function() {
    if (_IsWindowTiledToLeft()) {
        if (_IsWindowTiledToTop()) {
            workspace.slotWindowQuickTileLeft();
        } else if (_IsCurrentWindowVerticallyMaximized()) {
            workspace.slotWindowQuickTileBottomLeft();
        } else if (_IsWindowTiledToBottom()) {
            workspace.slotWindowMinimize();
        }
    } else if (_IsWindowTiledToRight()) {
        if (_IsWindowTiledToTop()) {
            workspace.slotWindowQuickTileRight();
        } else if (_IsCurrentWindowVerticallyMaximized()) {
            workspace.slotWindowQuickTileBottomRight();
        } else if (_IsWindowTiledToBottom()) {
            workspace.slotWindowMinimize();
        }
    } else {
        workspace.slotWindowMinimize();
    }
}

var shortcutPrefix = "Quick Tiling - Windows 10: ";
registerShortcut(shortcutPrefix + "Upwards", shortcutPrefix + "Upwards", "Meta+Up", QuickTileUpwards);
registerShortcut(shortcutPrefix + "Downwards", shortcutPrefix + "Downwards", "Meta+Down", QuickTileDownwards);

