var i, metas = [
    '<meta  id="head1" name="title"         content="">\n',
    '<meta  id="head2" name="description"   content="">\n',
    '<meta  id="head3" property="og:title"       content="">\n',
    '<meta  id="head4" property="og:description" content="">\n',
    '<meta  id="head5" property="og:url"         content="">\n',
    '<meta  id="head6" property="og:image"       content="http://www.wellsfargomedia.com/sibos2012/images/header/wf-sibos.png">\n',
    '<meta  id="head7" property="og:site_name"   content="www.wellsfargomedia.com">\n',
    '<meta  id="head8" property="og:type"        content="microsite">\n',
];

for (i = 0; i < metas.length; i++) {
    document.writeln(metas[i]);
}
