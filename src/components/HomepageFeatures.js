import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '喝茶',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        阿伟你又在喝茶喔，休息一下吧，去敲敲代码好不好~
      </>
    ),
  },
  {
    title: '专注一点',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        啊，死了啦，都是你害得啦。我才说你两句你就嫌我烦！
      </>
    ),
  },
  {
    title: '蹲Dua郎',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        我房里有一些好康的，比写代码还刺激，还可以教你蹲dua郎喔~
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
