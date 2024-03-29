const { getStore } = require("./services/getStore");

const handler = async (event) => {
  let stores = [];
  if (event.body) {
    let body = JSON.parse(event.body);
    const accounts = body.accounts;
    for (let account of accounts) {
      try {
        const store = await getStore(account);
        stores.push(store);
      } catch (e) {
        console.log(e)
        console.log(`Couldnt fetch store for ${account.username}`);
      }
    }
  }
  if (stores.length) {
    return {
      statusCode: 200,
      body: JSON.stringify({ stores }),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify("No store found")
  };
};

module.exports = {
  handler,
};
