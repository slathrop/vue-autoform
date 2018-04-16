
const examples = [
    {
        title: 'String field',
        schema: [
            {
                name : 'name',
                type : 'string'
            }
        ]
    },
    {
        title: 'String field with custom label and a default value',
        schema: [
            {
                name: 'name',
                type: 'string',
                label: 'Your full name',
                defaultValue: 'My name'
            }
        ]
    },
    {
        title: 'Password field',
        schema: [
            {
                name : 'password',
                label : 'Password',
                type: 'string',
                inputType: 'password'
            }
        ]
    },
    {
        title: 'Text area with min and max text length',
        schema: [{
            name : 'description',
            type: 'string',
            min: 20,
            max: 1000,
            rows: 5
        }]
    },
    {
        title: 'Integer number field',
        schema: [
            {
                name : 'intNum',
                type: 'number',
                min: 1
            }
        ]
    },
    {
        title: 'Decimal number field',
        schema: [
            {
                name : 'floatNum',
                type: 'number',
                min: 1,
                max: 20,
                step: 0.01
            }
        ]
    },
    {
        title: 'Date',
        schema: [{
            name : 'birthday',
            type: 'date',
            label: 'Your birthday',
            min: '2018-01-01T00:00:00.000Z',
            defaultValue: '2018-10-18T00:00:00.000Z'
        }]
    },
    {
        title: 'Datetime',
        schema: [{
            name : 'start',
            type: 'datetime',
            label: 'Starts at',
            min: '2018-01-01T00:00:00.000Z',
            defaultValue: '2018-04-16T22:30:00.000Z'
        }]
    },
    {
        title: 'Time',
        schema: [{
            name : 'start',
            type: 'time',
            label: 'Starts at',
            min : '18:00',
            max : '22:00',
            defaultValue: '20:30'
        }]
    },
    {
        title: 'Text with regEx validation',
        schema: [
            {
                name : 'url',
                type: 'string',
                label: 'URL',
                regEx: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i
            }
        ]
    },
    {
        title: 'Fields with prefix and suffix',
        schema: [{
            name : 'money',
            type: 'number',
            step : 0.01,
            label: 'Money',
            prefix: '$'
        },{
            name : 'amount',
            type: 'number',
            step : 0.01,
            label: 'Amount',
            suffix: '$'
        }]
    },
    {
        title: 'Boolean checkbox with default value',
        schema: [
            {
                name : 'agree',
                type: 'boolean',
                label: 'Do you agree?',
                defaultValue: true
            }
        ]
    },
    {
        title: 'Boolean radios',
        schema: [
            {
                name : 'agree',
                type: 'boolean',
                inputType: 'radio',
                label: 'Do you agree?'
            }
        ]
    },
    {
        title: 'Boolean select',
        schema: [
            {
                name : 'agree',
                type: 'boolean',
                inputType: 'select',
                label: 'Do you agree?',
                trueLabel: 'Yes, I agree',
                falseLabel: 'No, I do NOT agree'
            }
        ]
    },
    {
        title: 'Select',
        schema: [
            {
                name : 'choose',
                type: 'string',
                inputType: 'select',
                options: ['One', 'Two', 'Three'],
                defaultValue: 'One',
                label: 'Choose a number'
            }
        ]
    },
    {
        title: 'Select with numbers (1)',
        schema: [
            {
                name : 'choose',
                type: 'number',
                inputType: 'select',
                options: [1, 2, 3, 4],
                label: 'Choose a number'
            }
        ]
    },
    {
        title: 'Select with numbers (2)',
        schema: [
            {
                name : 'choose',
                type: 'number',
                inputType: 'select',
                options: [
                    {
                        text: 'One',
                        value: 1
                    },
                    {
                        text: 'Two',
                        value: 2
                    },
                    {
                        text: 'Three',
                        value: 3
                    }
                ],
                label: 'Choose a number'
            }
        ]
    },
    {
        title: 'Select multiple values',
        schema: [
            {
                name : 'colors',
                type: 'string',
                multiple: true,
                inputType : 'select',
                options: [
                    {
                        text: 'Red',
                        value: 'red'
                    },
                    {
                        text: 'Orange',
                        value: 'orange'
                    },
                    {
                        text: 'Yellow',
                        value: 'yellow'
                    },
                    {
                        text: 'Green',
                        value: 'green'
                    },
                    {
                        text: 'Blue',
                        value: 'blue'
                    },
                    {
                        text: 'Purple',
                        value: 'purple'
                    }
                ],
                defaultValue: ['yellow','red'],
                min: 2,
                max: 5,
                label: 'What are your favorite colors?'
            }
        ]
    },
    {
        title: 'Select multiple numbers',
        schema: [
            {
                name : 'numbers',
                type: 'number',
                inputType:'select',
                multiple: true,
                options: [
                    {
                        text: 'One',
                        value: 1
                    },
                    {
                        text: 'Two',
                        value: 2
                    },
                    {
                        text: 'Three',
                        value: 3
                    }
                ]
            }
        ]
    },
    {
        title: 'Radio group',
        schema: [
            {
                name : 'choose',
                type: 'string',
                inputType: 'radio',
                options: ['One', 'Two', 'Three'],
                defaultValue: 'One',
                optional: true,
                label: 'Choose a number'
            }
        ]
    },
    {
        title: 'Radio group with numbers (1)',
        schema: [
            {
                name : 'choose',
                type: 'number',
                inputType: 'radio',
                options: [1, 2, 3, 4],
                label: 'Choose a number'
            }
        ]
    },
    {
        title: 'Radio group with numbers (2)',
        schema: [
            {
                name : 'choose',
                type: 'number',
                inputType: 'radio',
                options: [
                    {
                        text: 'One',
                        value: 1
                    },
                    {
                        text: 'Two',
                        value: 2
                    },
                    {
                        text: 'Three',
                        value: 3
                    }
                ],
                label: 'Choose a number'
            }
        ]
    },
    {
        title: 'Checkbox group (only array value)',
        schema: [
            {
                name : 'colors',
                type: 'string',
                inputType : 'checkbox',
                options: [
                    {
                        text: 'Red',
                        value: 'red'
                    },
                    {
                        text: 'Orange',
                        value: 'orange'
                    },
                    {
                        text: 'Yellow',
                        value: 'yellow'
                    },
                    {
                        text: 'Green',
                        value: 'green'
                    },
                    {
                        text: 'Blue',
                        value: 'blue'
                    },
                    {
                        text: 'Purple',
                        value: 'purple'
                    }
                ],
                defaultValue: ['yellow','red'],
                label: 'What are your favorite colors?'
            }
        ]
    },
    {
        title: 'A Book Example',
        schema: [
            {
                name : 'title',
                type: 'string',
                label: 'Title',
                max: 50
            },
            {
                name: 'author',
                type: 'string',
                label: 'Author'
            },
            {
                name : 'copies',
                type: 'number',
                label: 'Number of copies',
                min: 0
            },
            {
                name : 'lastCheckedOut',
                type: 'date',
                label: 'Last date this book was checked out'
            },
            {
                name : 'summary',
                type: 'string',
                label: 'Brief summary',
                rows: 5,
                max: 1000
            }
        ]
    },
    {
        title: 'Object field',
        schema: [
            {
                name : 'item',
                type: 'object',
                $: [
                    {
                        name : 'name',
                        type: 'string'
                    },
                    {
                        name : 'quantity',
                        type: 'number'
                    }
                ]
            }
        ]
    },
    {
        title: 'Array of object fields',
        schema: [
            {
                name : 'item',
                type: 'object',
                multiple: true,
                $: [
                    {
                        name : 'name',
                        type: 'string'
                    },
                    {
                        name : 'quantity',
                        type: 'number'
                    }
                ]
            }
        ]
    },
    {
        title: 'Complex example',
        schema: [
            {
                name : 'id',
                type: 'number',
                min : 0,
                step : 1
            },
            {
                name : 'table',
                type: 'string',
                inputType : 'select',
                textProp : 'title',
                valueProp : 'id',
                options : [
                    { title : 'books', id : 0 },
                    { title : 'inventary', id : 1 },
                    { title : 'cart', id : 2 },
                    { title : 'comments', id : 2 }
                ]

            },
            {
                name : 'columns',
                type: 'object',
                multiple : true,
                $: [
                    {
                        label : 'Column name',
                        name : 'name',
                        type: 'string'
                    },
                    {
                        label : 'Data type',
                        name : 'type',
                        type: 'string'
                    },
                    {
                        label : 'Not nullable',
                        name : 'notNull',
                        type: 'boolean'
                    },
                    {
                        label : 'Is primary key',
                        name : 'isPrimarykey',
                        type: 'boolean'
                    }
                ]
            },
            {
                label : 'Indexes',
                name : 'indexes',
                type: 'object',
                multiple : true,
                $: [
                    {
                        label : 'Key',
                        name : 'key',
                        type: 'string'
                    },
                    {
                        label : 'Sparse',
                        name : 'sparse',
                        type: 'boolean',
                    },
                    {
                        label : 'Unique',
                        name : 'unique',
                        type: 'boolean',
                    }
                ]
            }
        ]
    }
];

export default examples;