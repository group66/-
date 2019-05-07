window.alert = alert;
function alert(e) {
    $("body").append(
        '<div id="msg"><div id="msg_top">信息<span class="msg_close">×</span></div><div id="msg_cont">' + e +
        '</div><div class="msg_close" id="msg_clear">确定</div></div>');
    $(".msg_close").click(function () {
        $("#msg").remove();
        window.location.href = './';
    });
}
function blogAjax(url, data, fn) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "JSON",
    error: function(data) {
      alert('加载异常，请稍后重试')
    },
    success: function(res) {
     typeof fn === 'function' && fn(res)
    }
  });
}
$('.register').on('click', function () {
    window.location.href = './register';
  })
    // 登录
  $(".login").on('click', function () {
    var login = "/users/user/login"
    var data = {
      username: $(".username").val(),
      password: $(".password").val()
    }
    blogAjax(login, data, function (res) {
      // 登录成功
      if (res.code == '010') {
        alert('登录成功');
      } else {
        $('.login-tips').html(res.message).css('color', 'red')
      }
    })
  })
  