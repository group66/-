window.alert = alert;
function alert(e) {
    $("body").append(
        '<div id="msg"><div id="msg_top">信息<span class="msg_close">×</span></div><div id="msg_cont">' + e +
        '</div><div class="msg_close" id="msg_clear">确定</div></div>');
    $(".msg_close").click(function () {
        $("#msg").remove();
        window.location.href = './login';
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
  $('.login').on('click', function () {
    window.location.href = './login';
  })

  // 注册
  $(".register").on('click', function () {
    var register = "/users/user/register"
    var data = {
      username: $(".username").val(),
      password: $(".password").val(),
      repassword: $(".repassword").val()
    }
    blogAjax(register, data, function (res) {
      // 注册成功
      if (res.code == '000') {
        alert('注册成功！');      
      } else {
        $('.register-tips').html(res.message).css('color', 'red')
      }
    })
  })

