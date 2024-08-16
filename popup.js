function uploadJson (content, href) {
  const bookmarksData = JSON.stringify(content, null, 2)
  const blob = new Blob([bookmarksData], { type: 'application/json' })

  const formData = new FormData()
  formData.append('file', blob, 'bookmarks.json')
  formData.append('name', 'bookmarks.json')
  formData.append('dir', '')

  fetch(href, { method: 'POST', body: formData, })
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
      uploadJson(bookmarks, href)
    });
  });
});