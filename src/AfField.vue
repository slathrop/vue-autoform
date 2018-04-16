<template>
    <component :key="key" v-model="model" :locale="locale" :theme="theme" :schema="schema" @input="$emit('input', $event)" :is="component" ></component>
</template>

<script>
    import Theme from './theme';
    export default {
        name : 'af-field',
        data() {
            return {
                keyNum : 0,
                model : this.value
            }
        },
        watch : {
            value() {
                this.model = this.value;
            }
        },
        props: {
            value : {},
            theme: {
                type: String,
                default : 'vuetify'
            },
            locale: {
                type: String,
                default : 'en-us'
            },
            schema: {
                type: Object,
                required: true
            },
            id: {
                type: String,
                default: 'id'
            }
        },
        computed : {
            key(){
                this.keyNum++;
                return 'component' + this.keyNum;
            },
            component() {
                let components = Theme[this.theme];
                if(!components) {
                    return null;
                }
                let name = '';
                switch (this.schema.type) {
                    case 'object':
                        if(this.schema.multiple) {
                            console.log("multiple")
                            name = 'AfMultiObjectGroup';
                        } else {
                            name = 'AfObjectGroup';
                        }
                        break;
                    case 'datetime':
                        if(this.schema.inputType && this.schema.inputType === 'radio') {
                            name = 'AfRadio';
                        } else if(this.schema.inputType && this.schema.inputType === 'select') {
                            name = 'AfSelect';
                        } else if(this.schema.inputType && this.schema.inputType === 'checkbox') {
                            name = 'AfCheckbox';
                        } else {
                            name = 'AfDateTime';
                        }
                        break;
                    case 'date':
                        if(this.schema.inputType && this.schema.inputType === 'radio') {
                            name = 'AfRadio';
                        } else if(this.schema.inputType && this.schema.inputType === 'select') {
                            name = 'AfSelect';
                        } else if(this.schema.inputType && this.schema.inputType === 'checkbox') {
                            name = 'AfCheckbox';
                        } else {
                            name = 'AfDate';
                        }
                        break;
                    case 'time':
                        if(this.schema.inputType && this.schema.inputType === 'radio') {
                            name = 'AfRadio';
                        } else if(this.schema.inputType && this.schema.inputType === 'select') {
                            name = 'AfSelect';
                        } else if(this.schema.inputType && this.schema.inputType === 'checkbox') {
                            name = 'AfCheckbox';
                        } else {
                            name = 'AfTime';
                        }
                        break;
                    case 'number':
                        if(this.schema.inputType && this.schema.inputType === 'radio') {
                            name = 'AfRadio';
                        } else if(this.schema.inputType && this.schema.inputType === 'select') {
                            name = 'AfSelect';
                        } else if(this.schema.inputType && this.schema.inputType === 'checkbox') {
                            name = 'AfCheckbox';
                        } else {
                            name = 'AfNumber';
                        }
                        break;
                    case 'string':
                        if(this.schema.inputType && this.schema.inputType === 'radio') {
                            name = 'AfRadio';
                        } else if(this.schema.inputType && this.schema.inputType === 'select') {
                            name = 'AfSelect';
                        } else if(this.schema.inputType && this.schema.inputType === 'checkbox') {
                            name = 'AfCheckbox';
                        } else {
                            name = 'AfText';
                        }
                        break;
                    case 'boolean':
                        if(this.schema.inputType && this.schema.inputType === 'radio') {
                            name = 'AfRadio';
                        } else if(this.schema.inputType && this.schema.inputType === 'select') {
                            name = 'AfSelect';
                        } else {
                            name = 'AfBoolCheckbox';
                        }
                        break;
                }
                if(!name) {
                    return null;
                }
                return components[name];
            }
        },
        methods : {
            onInput() {
                this.$emit('input', this.value);
            }
        }
    }
</script>