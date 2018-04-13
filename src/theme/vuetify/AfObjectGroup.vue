<template>
    <v-card>
        <v-card-actions v-if="removable" >
            <v-btn @click.native="onRemoveClick" flat icon color="primary">
                <v-icon>remove</v-icon>
            </v-btn>
        </v-card-actions>
        <v-card-title v-else="removable" >
            <span class="subheading">{{label}}</span>
        </v-card-title>
        <v-card-text>
            <auto-form-field v-for="(scheme, index) in schema.$"
                             :key="index"
                             :schema="scheme"
                             v-model="model[scheme.name]"
                             :locale="locale"
                             :theme="theme"
                             @input="onInput"
            ></auto-form-field>
        </v-card-text>
    </v-card>
</template>

<script>
    import AutoFormField from '../../AfField'
    export default {
        components : {
            AutoFormField
        },
        data() {
            return {
                model : this.value
            }
        },
        watch : {
            value() {
                this.model = this.value;
            }
        },
        props: {
            value : {
                type: Object
            },
            idx : {
                type : Number
            },
            removable : {
                type: Boolean,
                default : false
            },
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
            }
        },
        computed: {
            label() {
                return this.schema.label || this.schema.name;
            }
        },
        methods: {
            onInput (val) {
                this.$emit('input', this.model)
            },
            onRemoveClick() {
                this.$emit('remove', { index : this.idx, value : this.model })
            }
        },
        beforeMount() {
            if(!this.value && this.schema.defaultValue) {
                this.model = this.schema.defaultValue
            }
            if(!this.model) {
                this.model = {};
            }
            for(let i = 0; i < this.schema.$.length; i++) {
                let sc = this.schema.$[i];
                if(!this.model[sc.name]) {
                    if(sc.multiple) {
                        this.model[sc.name] = [];
                        continue;
                    }
                    switch (sc.type) {
                        case 'string':
                            this.model[sc.name] = '';
                            break;
                        case 'boolean':
                            this.model[sc.name] = false;
                            break;
                        case 'object':
                            this.model[sc.name] = {};
                            break;
                        case 'date':
                            this.model[sc.name] = (new Date()).toJSON();
                            break;
                        case 'number':
                            this.model[sc.name] = 0;
                            if(sc.min) {
                                this.model[sc.name] = Math.max( this.model[sc.name], sc.min );
                            }
                            if(sc.max) {
                                this.model[sc.name] = Math.min( this.model[sc.name], sc.max );
                            }
                            break;
                    }
                }
            }
            this.$emit('input', this.model);
        }
    }
</script>