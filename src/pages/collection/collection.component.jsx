import React, { useContext } from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

// The collections context containing the initial value for the shop_data
import CollectionsContext from '../../contexts/collections/collections.context'

import './collection.styles.scss';

// This is the harder way. This way we create another 'component' that wraps the other components.
// We don't need to import the Context Hook above for using it this way
/* const CollectionPage = ({ match }) => {
  // Want to leverage the collectionscontext consumer component - Used to consume the value
  // We will receive the 'collections' from Consumer
  return (
    <CollectionsContext.Consumer>
    {
      collections => {
        const collection = collections[match.params.collectionId];
        const { title, items } = collection;
        return (
          <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
              {items.map(item => (
                <CollectionItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      }
    }
    </CollectionsContext.Consumer>
  );
}; */

// The Easier way, we now import the Hook called useContext above
// The we will useContext to get the collections object
const CollectionPage = ({ match }) => {
  const collections = useContext(CollectionsContext);
  const collection = collections[match.params.collectionId];
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// connect removed - not using redux for it now
export default CollectionPage;
