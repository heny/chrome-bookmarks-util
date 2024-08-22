function uploadJson (content, href) {
  fetch(href, {
    method: 'POST', body: JSON.stringify(
      { data: content, filePath: 'bookmarks.json' },
      null, 2)
  })
    .then(res => res.json())
    .finally(() => alert('书签已上传！'))
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.bookmarks.getTree((bookmarks) => {
    const btn = document.getElementById('copyBookmarks')
    const upload = document.getElementById('uploadBookmarks')

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(JSON.stringify(bookmarks, null, 2))
        .then(() => {
          alert('书签已复制到剪贴板！');
        })
        .catch(err => {
          alert('复制失败', err);
        });
    });

    upload.addEventListener('click', async () => {
      const href = prompt('请输入上传地址')
      if (href === '' || !href.startsWith('http')) {
        alert('请输入正确的上传地址')
        return
      }
      // 如果每次都提醒，可以注释上面的直接填写这块，并重新导入扩展
      // const href = 'URL_ADDRESS'
      uploadJson(bookmarks, href)
    });
  });
});