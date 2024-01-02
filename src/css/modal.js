'use strict';

import { StyleSheet } from 'react-native';
import { theme } from '../core/theme';

const minWidth = '300px';


const styles = (params={}, options={}) => StyleSheet.create({
//=============================================================================
// MODALS
//=============================================================================
    modal: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: options.visible ? 10 : -10,
        minWidth: minWidth
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: params.height || 'auto',
        width: params.width || '100%',
        maxWidth: params.maxWidth || '600px',
        maxHeight: params.maxHeight || undefined,
        margin: params.margin || 'auto',
        padding: params.padding || 20,
    },
    modalTitle: {
        color: params.color || 'rgba(0, 0, 0, 0.7)',
        fontSize: params.fontSize || 20,
        fontWeight: params.fontWeight || 'bold',
        marginBottom: params.marginBottom || 12,
    },
    modalBody: {
        color: params.color || 'rgba(0, 0, 0, 0.7)',
        fontSize: params.fontSize || 16,
        marginBottom: params.marginBottom || 12,
    },
    modalRow: {
        flexDirection: params.flexDirection || 'row',
        justifyContent: params.justifyContent || 'space-between',
        alignItems: params.alignItems || 'center',
        marginBottom: params.marginBottom || 12,
        width: params.width || '100%',
    },
    modalContent: {
        backgroundColor: params.backgroundColor || 'transparent',
        backdropFilter: params.backdropFilter || 'blur(10px)',
        shadowRadius: params.shadowRadius || 10,
        shadowColor: params.shadowColor || 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: params.shadowOpacity || 0.5,

        borderColor: params.borderColor || 'rgba(0, 0, 0, 0.6)',
        borderWidth: params.borderWidth || 2,
        padding: params.padding || 20,
        borderRadius: params.borderRadius || 10,
        width: params.width || '100%',
    },
//=============================================================================
// LOADER
//=============================================================================
    animationLoader: {
        flex: params.flex || 1,
        justifyContent: params.justifyContent || 'center',
        alignItems: params.alignItems || 'center',
        transform: params.transform || [{ scale: 1 }],
        opacity: params.opacity || 1,
    },
    loaderImage: {
        width: 100,
        height: 100,
        borderRadius: '50%',
    },
//=============================================================================
// USER COMMANDS
//=============================================================================
    input: {
        backgroundColor: params.backgroundColor || 'white', // rgba(0, 0, 0, 0.5)
        width: params.width || '100%',
        margin: params.margin || 10,
        // padding: params.padding || 15,
        borderColor: params.borderColor || '#d9d9d9',
        borderWidth: params.borderWidth || 1,
        borderRadius: params.borderRadius || 6,
        fontSize: params.fontSize || 16,
        fontColor: params.fontColor || 'black',
    },
    buttonContainer: {
        flexDirection: params.flexDirection || 'row',
        flexWrap: params.flexWrap || 'wrap',
        justifyContent: params.justifyContent || 'flex-end',
        spaceBetween: params.spaceBetween || 'space-between',
        alignItems: params.alignItems || 'center',
        width: params.width || '100%',
        marginTop: params.marginTop || 20,
        gap: params.gap || 10,
    },
//=============================================================================
// GAME COMMANDS
//=============================================================================
    button: {
        backgroundColor: params.backgroundColor || 'transparent',
        backdropFilter: params.backdropFilter || 'blur(10px)',
        width: params.width || '60px',
        height: params.height || '60px',
        borderRadius: params.borderRadius || '50%',
        borderColor: params.borderColor || 'rgba(0, 0, 0, 0.6)',
        borderWidth: params.borderWidth || 2,
        display: params.display || 'flex',
        justifyContent: params.justifyContent || 'center',
        alignItems: params.alignItems || 'center',
    }
});


export default styles;
