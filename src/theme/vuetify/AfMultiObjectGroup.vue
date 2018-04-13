<template>
    <v-card>
        <v-card-title class="subheading">{{label}}</v-card-title>
        <v-card-text>
            <object-group
                    v-for="(item, index) in model"
                    :key="index"
                    :idx="index"
                    :schema="schema"
                    :removable="true"
                    v-model="model[index]"
                    :locale="locale"
                    :theme="theme"
                    @input="onInput"
                    @remove="onRemove"
                    >
            </object-group>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" flat icon @click="onAdd"><v-icon>add</v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import ObjectGroup from './AfObjectGroup'
    export default {
        components : {
            ObjectGroup
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
                type: Array
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
            onRemove({ index, value }) {
                this.model.splice(index, 1);
                this.$emit('input', this.model);
            },
            onAdd () {
                this.model.push({});
                this.$emit('input', this.model);
            }
        },
        beforeMount() {
            if(!this.value && this.schema.defaultValue) {
                this.$emit('input', this.model);
                this.model = this.schema.defaultValue
            }
            this.model = this.model ? this.model : [];
        }
    }
</script>