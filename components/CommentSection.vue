<template>
<section id="comments">
    <div class="comments">
        <div class="comments_wrapper">
        <div class="comments_block_title">发表评论</div>
        <div class="new_comment_form_container">
            <div id="new_comment_form">
                <div class="comment_trigger" v-show="!isTriggered">
                    <div class="avatar">
                        <img src="~assets/images/visitor.png">
                    </div>
                    <div class="trigger_title">撰写评论</div>
                </div>
                <div class="new_comment">
                    <textarea name="content" rows="2" class="textarea_box" v-model="newComment.content"  @focus="triggerContent"></textarea>
                    <span class="comment_error"></span>
                </div>
                <div class="comment_triggered" v-show="isTriggered" :class="{ 'fade-in': isTriggered }">
                    <div class="input_body">
                        <ul class="ident">
                            <li>
                                <input type="text" v-model="newComment.name" name="nickname" placeholder="昵称">
                            </li>
                            <li>
                                <input type="email" v-model="newComment.email" name="email" placeholder="邮箱">
                            </li>
                            <li>
                                <input type="text" v-model="newComment.website" name="site" placeholder="网站">
                            </li>
                        </ul>
                        <input @click="submitComment" value="提交评论" class="comment_submit_button c_button">
                    </div>
                </div>
            </div>
        </div>
        <ul class="comments">
            <li v-for="(comment, index) in comments" :key="comment.id"  class="comment">
                <div class="comment_wrapper">
                    <div class="author">
                    <div class="avatar">
                        <img :src="avatarFromGravatar[index]" width="40">
                    </div>
                    <div class="author-name">
                        <a :href="comment.website" rel="external nofollow"><b v-text="comment.name"></b></a>
                        <a href="javascript:void(0)" onclick="reply_comment('psa', 'c92efa9c8d0f8301307fe3e26f229d67')" class="reply">reply</a>
                    </div>
                    <div class="author-date"><small v-text="createdAt[index]"></small></div>
                    </div>
                    <div class="comment_content"><div class="p_part"><p v-text="comment.content"></p></div></div>
                </div>
            </li>
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
const gravatar = require('gravatar')
const moment = require('moment')

export default {
  name: 'CommentSection',
  props: ['article'],
  data () {
    return {
      newComment: {
        articleId: this.article,
        parentId: this.parent || undefined,
        name: '',
        email: '',
        website: '',
        content: ''
      },
      comments: [],
      isTriggered: false
    }
  },
  computed: {
    avatarFromGravatar () {
      return this.comments.map(comment => {
        return gravatar.url(comment.email)
      })
    },
    createdAt () {
      return this.comments.map(comment => {
        return moment(comment.createdAt).format('YYYY-MM-DD h:mm a')
      })
    }
  },
  methods: {
    triggerContent () {
      this.isTriggered = true
    },
    async submitComment () {
      return this.$axios.post('/comments', this.comment).then(response => {
        console.log(response.data)
      })
    }
  },
  async mounted () {
    this.comments = (await this.$axios.get(`/comments/?article=${this.article}`)).data
  }
}
</script>

<style>

</style>
