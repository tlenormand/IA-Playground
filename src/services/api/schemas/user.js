'use strict';


//==============================================================================
// TO DB
//==============================================================================
const formatUsers = (users) => {
    return users.map(formatUser);
};

const formatUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: user.company,
        address: user.address,
    };
};

const reduceUsers = (users) => {
    return users.map(formatUser);
};

//==============================================================================
// FROM DB
//==============================================================================
const reduceUser = (user) => {
    'id': { type: Number, required: true },
    'name': { type: String, required: true },
    'email': { type: String, required: true },
    'phone': { type: String, required: true },
    'website': { type: String, required: true },
    'company': { type: String, required: true },
    'address': { type: String, required: true },
};

export {
    formatUsers,
    formatUser,
    reduceUsers,
    reduceUser,
};
