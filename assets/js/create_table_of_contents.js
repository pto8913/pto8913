function CreateTableOfContents(window, document) {
  const selector = document.querySelector('.post-body');
  if (!selector) {
    return
  }

  const toc = document.createElement('details');
  const sum = document.createElement('summary');
  const list = document.createElement('ul');
  toc.id = 'toc';
  toc.open = true;
  sum.className = 'toc-title';
  sum.textContent = '目次';
  list.className = 'toc-container';
  toc.appendChild(sum);
  toc.appendChild(list);

  const headings = selector.querySelectorAll('h2, h3, h4');
  if (headings.length == 0) {
    return
  }
  headings[0].parentNode.insertBefore(toc, headings[0]);
  const order = [];
  const stack = [{level: 1, element: list}];

  // 事前処理
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1))
    order.push(level);
  });

  headings.forEach((heading, i) => {
    const level = parseInt(heading.tagName.substring(1));
    const next = order[i + 1];
    const li = document.createElement('li');
    const a = document.createElement('a');
    const id = 'toc-' + (i + 1);
    const ul = document.createElement('ul');

    // 目次要素の生成
    a.textContent = heading.textContent;
    a.href = `#${id}`;
    li.appendChild(a);
    if (level < next) {
      li.appendChild(ul);
    }

    // リンク先の生成
    heading.id = id;

    // 階層構造の生成
    let parent;
    do {
      parent = stack.pop();
    } while (parent.level >= level);
    parent.element.appendChild(li);
    stack.push(parent);
    stack.push({level: level, element: ul});
  });
}(window, document);