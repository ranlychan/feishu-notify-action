# 飞书机器人通知Github Action

用于在Github Action工作流中向自己的飞书机器人webhook发送自定义消息，支持传入消息类型和消息体，因此理论上支持飞书机器人的所有消息类型。目前强制使用签名校验方式进行安全校验。

飞书机器人文档：https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot?lang=zh-CN#3c6592d6

官方示例实现：

```yml
name: Test Feishu Notify

on:
  workflow_dispatch:

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Send Feishu Text Notification
        uses: ranlychan/feishu-notify-action@main
        with:
          feishu_webhook: ${{ secrets.FEISHU_BOT_WEBHOOK }}
          feishu_secret: ${{ secrets.FEISHU_BOT_SIGNKEY }}
          msg_type: text
          content: '{"text":"✅ 测试消息：Feishu 通知成功！"}'

      - name: Send Feishu Rich Text Notification
        uses: ranlychan/feishu-notify-action@main
        with:
          feishu_webhook: ${{ secrets.FEISHU_BOT_WEBHOOK }}
          feishu_secret: ${{ secrets.FEISHU_BOT_SIGNKEY }}
          msg_type: post
          content: "{\"post\":{\"zh_cn\":{\"title\":\"项目更新通知\",\"content\":[[{\"tag\":\"text\",\"text\":\"项目有更新: \"},{\"tag\":\"a\",\"text\":\"请查看\",\"href\":\"https://www.ranlychan.top/\"},{\"tag\":\"at\",\"user_id\":\"all\"}]]}}}"

      - name: Send Feishu Sharing Chat Notification
        uses: ranlychan/feishu-notify-action@main
        with:
          feishu_webhook: ${{ secrets.FEISHU_BOT_WEBHOOK }}
          feishu_secret: ${{ secrets.FEISHU_BOT_SIGNKEY }}
          msg_type: share_chat
          content: "{\"share_chat_id\":\"${{ secrets.FEISHU_GROUP_ID_1 }}\"}"

      - name: Send Feishu Image Notification
        uses: ranlychan/feishu-notify-action@main
        with:
          feishu_webhook: ${{ secrets.FEISHU_BOT_WEBHOOK }}
          feishu_secret: ${{ secrets.FEISHU_BOT_SIGNKEY }}
          msg_type: image
          content: "{\"image_key\":\"img_ecffc3b9-8f14-400f-a014-05eca1a4310g\"}"

      - name: Send Feishu Card Notification
        uses: ranlychan/feishu-notify-action@main
        with:
          feishu_webhook: ${{ secrets.FEISHU_BOT_WEBHOOK }}
          feishu_secret: ${{ secrets.FEISHU_BOT_SIGNKEY }}
          msg_type: interactive
          card: "{\"schema\":\"2.0\",\"config\":{\"update_multi\":true,\"style\":{\"text_size\":{\"normal_v2\":{\"default\":\"normal\",\"pc\":\"normal\",\"mobile\":\"heading\"}}}},\"body\":{\"direction\":\"vertical\",\"padding\":\"12px 12px 12px 12px\",\"elements\":[{\"tag\":\"markdown\",\"content\":\"西湖，位于中国浙江省杭州市西湖区龙井路1号，杭州市区西部，汇水面积为21.22平方千米，湖面面积为6.38平方千米。\",\"text_align\":\"left\",\"text_size\":\"normal_v2\",\"margin\":\"0px 0px 0px 0px\"},{\"tag\":\"button\",\"text\":{\"tag\":\"plain_text\",\"content\":\"🌞更多景点介绍\"},\"type\":\"default\",\"width\":\"default\",\"size\":\"medium\",\"behaviors\":[{\"type\":\"open_url\",\"default_url\":\"https://baike.baidu.com/item/%E8%A5%BF%E6%B9%96/4668821\",\"pc_url\":\"\",\"ios_url\":\"\",\"android_url\":\"\"}],\"margin\":\"0px 0px 0px 0px\"}]},\"header\":{\"title\":{\"tag\":\"plain_text\",\"content\":\"今日旅游推荐\"},\"subtitle\":{\"tag\":\"plain_text\",\"content\":\"\"},\"template\":\"blue\",\"padding\":\"12px 12px 12px 12px\"}}"

```
