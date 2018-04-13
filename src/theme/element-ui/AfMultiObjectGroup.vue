<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{label}}</span>
        </div>
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
                style="margin-bottom: 8px"
        >
        </object-group>
        <div class="bottom clearfix" >
            <el-button type="primary" icon="el-icon-plus" circle @click.native="onAdd" size="mini"></el-button>
        </div>
    </el-card>
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