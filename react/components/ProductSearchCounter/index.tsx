import React, { useEffect } from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { canUseDOM } from 'vtex.render-runtime'

import Style from './style.css';

export const ProductSearchCounter = () => {
    const qttResult = useSearchPage()?.searchQuery?.recordsFiltered;
    
    useEffect(()=>{
        if(document && canUseDOM){
            const returnTopElement = document.querySelector(".vtex-flex-layout-0-x-resultsearch-quantity") as HTMLElement;
            returnTopElement.style.right = rightPosQttCalc()+"px";

            setPropertyPercentageProducts();

            const returnToTopDiv = document.querySelector('.vtex-flex-layout-0-x-flexRowContent--return-top') as HTMLElement;
            returnToTopDiv.style.border = "none";
            
            const returnToTopRow = document.querySelector('.vtex-flex-layout-0-x-flexRow--return-top .vtex-flex-layout-0-x-flexRowContent--return-top') as HTMLElement;
            returnToTopRow.style.opacity = "0";

            document.querySelector('body')?.addEventListener("scroll", () => {
                setPropertyPercentageProducts();
            });
        }
    },[canUseDOM]);

    const setPropertyPercentageProducts = (): void =>{
        const lastShowed = document.querySelectorAll('.vtex-search-result-3-x-galleryItem--small').length;
        const nextElementAfterPLP = document.querySelector(".vtex-flex-layout-0-x-flexRow--kits-shelf") as HTMLElement;
        let body = document.querySelector('body') as HTMLElement;

        var scrollAtual = document.body.scrollTop + body.offsetHeight;
        var scrollTotal = getElementPositionScroll(nextElementAfterPLP);
        const percentagePage = scrollAtual < scrollTotal ? scrollAtual/scrollTotal : 1;

        const root = document.querySelector(':root') as HTMLElement;
        const percentageShowed = lastShowed/qttResult;

        let percentageProducts = +percentageShowed.toFixed(4);
        
        const showedPercentageGraphic = percentagePage*percentageProducts;
        root.style.setProperty('--percentage-products', (180*showedPercentageGraphic)+"deg");
    }
    
    function getElementPositionScroll(element: HTMLElement) { 
        var box = element.getBoundingClientRect();
    
        var body = document.body;
        var docEl = document.documentElement;
    
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    
        var clientTop = docEl.clientTop || body.clientTop || 0;
    
        var top  = box.top +  scrollTop - clientTop;
    
        return Math.round(top);
    }

    const rightPosQttCalc = (): number => {
        const quantitySearchElement = document.querySelector(".vtex-flex-layout-0-x-resultsearch-quantity") as HTMLElement;
        const returnTopElement = document.querySelector(".vtex-flex-layout-0-x-flexRowContent--return-top") as HTMLElement;
        const positionRightOfReturnTop = document.body.getBoundingClientRect().right - returnTopElement.getBoundingClientRect().right;
        const quantitySearchWidth = quantitySearchElement.offsetWidth;
        const returnTopWidth = returnTopElement.offsetWidth;
        return ((positionRightOfReturnTop+(returnTopWidth/2))-quantitySearchWidth/2);
    }

    return (
        <>
        <div className={Style.circleWrap}>
            <div className={`${Style.circle}`}>

                <div className={`${Style.mask} ${Style.full}`}>
                    <div className={Style.fill}></div>
                </div>

                <div className={`${Style.mask} ${Style.half}`}>
                    <div className={Style.fill}></div>
                </div>

                <div className={Style.insideCircle}> 
                    <div className="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--return-top2">
                        <section className="vtex-store-components-3-x-container ph3 ph5-m ph2-xl mw9 center ">
                            <div className="vtex-flex-layout-0-x-resultsearch-quantity">{qttResult}</div>
                            <div className="flex-none flex-ns mt0 mb0 pt0 pb0    justify-start vtex-flex-layout-0-x-flexRowContent vtex-flex-layout-0-x-flexRowContent--return-top items-stretch w-100">
                                <div className="pr0-ns pb0 pb0-ns items-stretch vtex-flex-layout-0-x-stretchChildrenWidth   flex" style={{"width": "100%"}}>
                                    <div className="return-the-top">top</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div> 
            </div>
        </div>
        </>

    )
}
