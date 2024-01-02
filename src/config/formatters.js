'use strict';

//==============================================================================
// formatters.js
//==============================================================================
// DESCRIPTION:
// 
// default formatters for the API
//==============================================================================
// DEFAULT VALUES:
//
// _options: {
//     extra: false
// }
// mandatory: false
// type: 'any'
// 
//==============================================================================
// ALLOWED:
//
// _options: {
//     extra: true, false                                               => if true, extra fields are allowed
// }
// type: 'any', 'string', 'number', 'boolean', 'array', 'object'
// mandatory: true, false                                               => if true, field is mandatory and cannot be empty
//
//==============================================================================

export const formatters = {
    user: {
        _options: {
            extra: false // if true, extra fields are allowed
        },
        name: {
            mandatory: true,
            type: 'string',
        },
        email: {
            mandatory: true,
            type: 'string',
        },
        password: {
            mandatory: true,
            type: 'string',
        },
        phone: {
            type: 'string',
        }
    },
};