function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

const app = new Vue({
  el: "#app",
  computed: {
    username: function() {
      const token = getCookie("authToken");
      if (!token) return "Unknown (NOTOKEN)";
      const data = token.split(".")[1];
      if (!data) return "Unknown (BADDATA)";
      try {
        const js = JSON.parse(b64DecodeUnicode(data));
        return js.data.name;
      } catch (e) {
        return "Unknown (NOTJSON)";
      }
    }
  },
  methods: {
    getFlag: function() {
      this.$http.get("/flag").then(({ body: { error, flag } }) => {
        if (error) {
          console.error(error);
          return;
        }
        alert(
          `Congratulations! You can validate this challenge with the flag:\n${flag}`
        );
      });
    }
  }
});
