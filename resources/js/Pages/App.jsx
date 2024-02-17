import { InertiaApp } from '@inertiajs/inertia-react';
​
return (<InertiaApp
    initialPage={JSON.parse(el.dataset.page)}
    resolveComponent={name => require(`./Pages/${name}`).default}
/>);
