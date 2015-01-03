$(document).ready(function() {
	chrome.bookmarks.getTree(function(tree) {
		var list = $('<main>').appendTo('body');
		var walk = function(i, item) {
			if (item.url && item.url != '') {
				var bookmark = $('<a href="' + item.url + '">' + item.title + '</a>');
				bookmark.prepend('<img src="https://plus.google.com/_/favicon?domain=' + item.url + '"/>');
				$(list).append(bookmark);
			}
			if (item.children) {
				list = $('<section>').appendTo(list);
				if (item.title)
					$(list).append('<h1>' + item.title + '</h1>');
				$.each(item.children, walk);
				list = list.parents('main,section').first();
			}
		};
		$.each(tree[0].children[0].children, walk);
	});
	$('a').on('click', function() {
		_this = this;
		chrome.tabs.getCurrent(function(tab) {
			chrome.tabs.update(tab.id, {
				url:_this.href
			});
		});
	});
});
