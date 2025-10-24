const core = require("@actions/core");
const axios = require("axios");
const crypto = require("crypto");

async function main() {
  try {
    const webhook = core.getInput("feishu_webhook");
    const secret = core.getInput("feishu_secret");
    const msg_type = core.getInput("msg_type");
    const contentInput = core.getInput("content");
    const cardInput = core.getInput("card");

    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `${timestamp}\n${secret}`;
    const hmac = crypto.createHmac("sha256", stringToSign);
    hmac.update(Buffer.alloc(0)); 
    const sign = hmac.digest("base64");

    // 构造 payload
    const payload = {
      timestamp: timestamp.toString(),
      sign,
      msg_type
    };

    if (contentInput) {
      try {
        payload.content = JSON.parse(contentInput);
      } catch (err) {
        core.setFailed(`Invalid JSON for content: ${err.message}`);
        return;
      }
    }

    if (cardInput) {
      try {
        payload.card = JSON.parse(cardInput);
      } catch (err) {
        core.setFailed(`Invalid JSON for card: ${err.message}`);
        return;
      }
    }

    const response = await axios.post(webhook, payload);

    console.log("Feishu response:", JSON.stringify(response.data, null, 2));

    // 判断飞书返回
    if (response.data.code !== 0) {
      core.setFailed(`Feishu webhook failed: ${response.data.msg}`);
    } else {
      core.info("Feishu notification sent successfully.");
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

main();
