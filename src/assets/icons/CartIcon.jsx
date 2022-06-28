import React from 'react';

const CartIcon = (props) => {
    return (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9351 20.0336L20.7491 8.51772C20.7002 8.0402 20.2979 7.67725 19.8179 7.67725H4.21319C3.73446 7.67725 3.33246 8.03898 3.28221 8.51523L2.0644 20.0368C1.9639 21.0423 2.2991 22.0529 2.9838 22.8097C3.66855 23.5659 4.6398 24.0001 5.64879 24.0001H18.3825C19.3868 24.0001 20.349 23.5747 21.0213 22.8322C21.7029 22.081 22.0359 21.0623 21.9351 20.0336ZM19.6346 21.5748C19.3113 21.9312 18.8666 22.1275 18.3825 22.1275H5.64911C5.16818 22.1275 4.70285 21.9181 4.37233 21.5529C4.04182 21.1878 3.87986 20.7031 3.9273 20.2284L5.05582 9.55014H18.973L20.0722 20.2216C20.1221 20.7281 19.9664 21.2087 19.6346 21.5748Z"/>
            <path d="M12.1708 0C9.2109 0 6.80273 2.40811 6.80273 5.36803V8.6138H8.6753V5.36803C8.6753 3.44053 10.2433 1.87256 12.1708 1.87256C14.0983 1.87256 15.6665 3.44053 15.6665 5.36803V8.6138H17.5388V5.36803C17.5388 2.40811 15.1307 0 12.1708 0Z"/>
        </svg>
    );
};

export default CartIcon;