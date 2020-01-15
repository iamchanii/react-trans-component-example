import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  memo,
} from 'react';
import * as _ from 'remeda';
import { allPass } from 'remeda/dist/commonjs/allPass';

const isNotFragment = (element: any): boolean => element.type !== Fragment;

const isTagToken = (token: string): boolean => /<[^>]*>/.test(token);

const isSelfClosedTagToken = (token: string): boolean => /<\d\/>/.test(token);

const getTagTokenContent = (token: string): string =>
  /<[^>]*>(.+)<[^>]*>/.exec(token)![1];

const wrapWithFragment = (token: string) => (
  <Fragment key={token}>{token.replace(/ /g, '\u00a0')}</Fragment>
);

interface TransProps {
  message: string;
}

const Trans: React.FC<TransProps> = memo(({ children, message }) => {
  const childrenElementMap = _.pipe(
    Children.toArray(children),
    _.filter(allPass([isValidElement, isNotFragment])),
    _.reduce.indexed((acc, child, index) => ({ ...acc, [index]: child }), {}),
  );

  let index = 0;

  return message.split(/(<(?:\/|)\d(?:\/>|.+?>))/g).map(token => {
    if (!isTagToken(token)) {
      return wrapWithFragment(token);
    }

    const childElement = childrenElementMap[index++] as any;

    return childElement
      ? cloneElement(childElement, {
          children: isSelfClosedTagToken(token)
            ? undefined
            : getTagTokenContent(token),
        })
      : wrapWithFragment(token);
  }) as any;
});

Trans.displayName = 'Trans';

export default Trans;
