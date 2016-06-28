import Post from '../models/post';
import Category from '../models/category';
import Tag from '../models/tag';

const about = function *(next) {
    yield this.render('page/about.html', {
        ptitle: '关于',
        currentCat: 'about',
        user: this.session.user,
    });

    yield next;
};

const sitemap = function *(next) {
    let oPosts;
    let oTags;
    let pages = [{
        title: '关于',
        url: '/about',
    }];

    yield Post.findByCat().then(posts => {
        oPosts = posts;
        return Tag.findAll();
    }).then(tags => {
        oTags = tags;
        return Category.findAll();
    }).then(cats => {
        return this.render('page/sitemap.html', {
            ptitle: '网站地图',
            posts: oPosts,
            cats: cats,
            pages: pages,
            tags: oTags,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};

export default {
    about,
    sitemap,
};

