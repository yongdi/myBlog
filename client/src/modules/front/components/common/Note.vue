<template>
    <div class="note-box">
        <h2>{{m}}</h2>
        <br>
        <form>
            <input class="note-input" type="text" v-model="m" placeholder="edit me">
            <br>
            <input class="el-button--primary" type="submit" @click="leaveMessage(m)" value="提交">
        </form>

    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
    name: 'note-box',
    data() {
        return {
            m: '操',
        };
    },
    computed: {
        ...mapGetters([
            'note_message',
        ]),
    },
    methods: {
        ...mapActions([
            'leaveMessage',
        ]),
    },
    created() {
        this.m = this.note_message;
    },
    watch: {
        note_message: function(n, o) {
	    this.m = n;
        }
    }
};
</script>

<style lang="stylus" scoped>
.note-box
  position relative
  padding-top 180px
  padding-left 50px
  min-height 180px
  margin-bottom 120px
.note-input
  border-style: groove
</style>
