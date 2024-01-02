// 'use strict';

// import { formatters } from '../config/formatters';


// export default class Formatter {
//     constructor() {
//         this.mandatory = false;
//         this.type = 'any';
//         this.extra = false;
//     }

//     _getdata() {
//         return this._data;
//     }

//     _setdata(value) {
//         this._data = value;
//     }

//     validate(data, entity) {
//         // if not an object, return false
//         if (!data || typeof data !== 'object') { return false; }

//         if (formatters[entity]._options.extra) { this.extra = formatters[entity]._options.extra; }

//         const mandatoryMissing = this.validateMandatory(data, entity);
//         if (mandatoryMissing) { return mandatoryMissing };

//         return Object.keys(data).map((key) => {
//             return this.validateObject(key, data[key], formatters[entity][key]);
//         }).filter(Boolean);
//     }

//     validateMandatory(data, entity) {
//         // check for mandatory fields
//         const mandatory = Object.keys(formatters[entity]).filter((key) => {
//             return formatters[entity][key].mandatory;
//         });

//         // verify mandatory fields are not missing
//         const missing = mandatory.filter((key) => {
//             return !data[key];
//         });

//         // if missing mandatory fields, return false with missing fields
//         if (missing.length > 0) {
//             const message = `ERROR Formatter: missing: ${missing}`;
//             console.log(message);

//             return {
//                 success: false,
//                 error: {
//                     missing: missing
//                 },
//                 message: message
//             };
//         }
//     }

//     validateObject(key, value, properties) {
//         // if object
//         if (typeof value === 'object' && !Array.isArray(value)) {
//             return Object.keys(value).forEach((key) => {
//                 this.validateObject(key, value[key]);
//             });
//         }

//         // if array
//         // if (Array.isArray(value)) {
//         //     return;
//         // }

//         // check extra
//         if (!properties && !this.extra) {
//             const message = `ERROR Formatter: extra: '${key}' is not allowed in this entity`
//             console.log(message);

//             return {
//                 success: false,
//                 error: {
//                     at: key,
//                     value: value,
//                     is: value,
//                     formatter: (properties?._options?.extra || this.extra)
//                 },
//                 message: message
//             };
//         }

//         // check type
//         if (properties?.type ? properties?.type !== typeof value : this.type !== typeof value) {
//             // if array
//             if (properties?.type === 'array' && !Array.isArray(value)) {
//                 const message = `ERROR Formatter: typeof value: '${key}' is wrong type, is type: '${typeof value}' should be '${properties?.type || this.type}'`;
//                 console.log(message);

//                 return {
//                     success: false,
//                     error: {
//                         at: key,
//                         value: value,
//                         is: Array.isArray(value) ? 'array' : typeof value,
//                         formatter: (properties?.type || this.type)
//                     },
//                     message: message
//                 };
//             }
//         }

//         // check mandatory are not empty
//         if (properties?.mandatory && !value
//             || (Array.isArray(value) && !value.length)
//             || (Array.isArray(value) && value.length === 1 && !value[0])) {

//             const message = `ERROR Formatter: empty: '${key}' is empty, is value: '${value}' should be '${properties?.mandatory || this.mandatory}'`
//             console.log(message);

//             return {
//                 success: false,
//                 error: {
//                     at: key,
//                     value: value,
//                     is: properties?.mandatory || this.mandatory,
//                     formatter: (properties?.mandatory || this.mandatory)
//                 },
//                 message: message
//             };
//         }
//     }
// }


class Formatter {
    constructor(schema) {
      this.schema = schema;
    }
  
    validate(data) {
      let isValid = true;
  
      for (const key in this.schema) {
        if (!data.hasOwnProperty(key)) {
          console.log(`La propriété "${key}" est manquante dans les données.`);
          isValid = false;
        } else if (typeof data[key] !== this.schema[key]) {
          console.log(`La propriété "${key}" doit être de type ${this.schema[key]}.`);
          isValid = false;
        }
      }
  
      return isValid;
    }
  }
  
  const userSchema = {
    firstName: 'string',
    lastName: 'string',
    age: 'number',
    email: 'string'
  };
  
  export const formatter = new Formatter(userSchema);