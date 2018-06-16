<template>
<section id="comments">
    <div class="comments">
        <div class="comments_wrapper">
        <div class="comments_block_title">发表评论</div>
        <div class="new_comment_form_container">
            <form id="new_comment_form" method="post" action="/service/comment/new">
                <input name="path" type="hidden" value="code/downloading-node-sass-from-github-is-too-slow.md">
                <input id="reply_to_id" name="reply" type="hidden" value="">
                <div class="comment_trigger" v-show="!isTriggered">
                    <div class="avatar">
                        <img src="~assets/images/visitor.png">
                    </div>
                    <div class="trigger_title">撰写评论</div>
                </div>
                <div class="new_comment">
                    <textarea name="content" rows="2" class="textarea_box" @focus="triggerContent"></textarea>
                    <span class="comment_error"></span>
                </div>
                <div class="comment_triggered" v-show="isTriggered" :class="{ 'fade-in': isTriggered }">
                    <div class="input_body">
                        <ul class="ident">
                            <li>
                                <input type="text" v-model="commentor.nickname" name="nickname" placeholder="昵称">
                            </li>
                            <li>
                                <input type="email" v-model="commentor.email" name="email" placeholder="邮箱">
                            </li>
                            <li>
                                <input type="text" v-model="commentor.site" name="site" placeholder="网站">
                            </li>
                        </ul>
                        <input type="submit" value="提交评论" class="comment_submit_button c_button">
                    </div>
                </div>
            </form>
        </div>
        <ul class="comments">
        </ul>
        </div>
    </div>
</section>
</template>

<style scoped>
.fade-in {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.5s;
}

@keyframes fadeInOpacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>

<script>
export default {
  name: 'CommentSection',
  data () {
    return {
      commentor: {
        nickname: '',
        email: '',
        site: ''
      },
      isTriggered: false
    }
  },
  methods: {
    triggerContent () {
      this.isTriggered = true
    }
  }
}
</script>

<style>

</style>
