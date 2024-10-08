// START OF HELPER FUNCTIONS ///////////////////////////////////////////////////
const formVersion = "v2.0.1";
const isMobile = window.innerWidth <= 768;
const fetchWidgetSetting = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from R2:", error);
    return null;
  }
};

const shortenProcedureString = (string) => {
  if (string === "BREAST_AUGMENTATION") return "breast aug";
  if (string === "BBL") return string;
  return string.toLowerCase().replace("_", " ");
};

// END OF HELPER FUNCTIONS /////////////////////////////////////////////////////

const formName = document.currentScript.getAttribute("formName");
const clinicSdkKey = document.currentScript.getAttribute("clinicSdkKey");
if (!formName || !clinicSdkKey) {
  console.error("Missing required attributes: formName, clinicSdkKey");
}
const widgetSettingUrl = `https://www.clinic-assets.clinic-os.com/${clinicSdkKey}/widget_settings.json`;

let themeColor = "#00B4F4";
let textColor = "#ffffff";
let ctaPosition = "above";
let ctaPositionDesktop = "right";
let ctaPositionMobile = "right";
let isCtaOpenByDefaultDesktop = "true";
let isCtaOpenByDefaultMobile = "true";
let horizontalOffsetDesktop = "10px";
let verticalOffsetDesktop = "10px";
let horizontalOffsetMobile = "10px";
let verticalOffsetMobile = "10px";

fetchWidgetSetting(widgetSettingUrl)
  .then((data) => {
    themeColor = data.themeColor ?? themeColor;
    textColor = data.textColor ?? textColor;
    ctaPosition = data.ctaPosition ?? ctaPosition;
    ctaPositionDesktop = data.ctaPositionDesktop ?? ctaPositionDesktop;
    ctaPositionMobile = data.ctaPositionMobile ?? ctaPositionMobile;
    isCtaOpenByDefaultDesktop =
      data.isCtaOpenByDefaultDesktop ?? isCtaOpenByDefaultDesktop;
    isCtaOpenByDefaultMobile =
      data.isCtaOpenByDefaultMobile ?? isCtaOpenByDefaultMobile;
    horizontalOffsetDesktop = `${data.horizontalOffsetDesktop ?? horizontalOffsetDesktop}px`;
    verticalOffsetDesktop = `${data.verticalOffsetDesktop ?? verticalOffsetDesktop}px`;
    horizontalOffsetMobile = `${data.horizontalOffsetMobile ?? horizontalOffsetMobile}px`;
    verticalOffsetMobile = `${data.verticalOffsetMobile ?? verticalOffsetMobile}px`;
  })
  .catch((error) => {
    console.error("Error fetching widget settings:", error);
  })
  .finally(() => {
    // FORM URL ////////////////////////////////////////////////////////////////////
    const onboardingTier1 = `https://form-staging.clinicos.ai/${formName}/?clinicSdkKey=${clinicSdkKey}&themeColor=${encodeURIComponent(themeColor)}&referrer=${document.referrer}&formVersion=${formVersion}&isMobile=${isMobile}#`;
    // END OF FORM URL /////////////////////////////////////////////////////////////

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    const keyframesModalPulse = `
@keyframes buttonPulse {
  25% 100% {
		transform: scale(1);
		box-shadow: 0 0 0 0 ${themeColor}B3;

    }
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 ${themeColor}B3;
	}

	14% {
		transform: scale(1);
		box-shadow: 0 0 0 20px ${themeColor}00;
	}

	20% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 ${themeColor}00;
	}
}
`;

    const keyframesModalSelectFadeIn = `
@keyframes modalSelectFadeIn {
    0% {
        display: none;
        opacity: 0;
    }
    100% {
        opacity: 1;
        display: flex;
    }
}
`;

    const keyframesModalSelectFadeOut = `
@keyframes modalSelectFadeOut {
    0% {
        display: flex;
        opacity: 1;
    }
    1% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none;
    }
}
`;

    const hovered = `.clinicos-flow__hovered { \
    filter: brightness(90%) !important; \
    cursor: pointer !important; \
}`;

    // ASSETS //////////////////////////////////////////////////////////////////////
    const floatingButtonSvg = `
<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_6749_3864)">
    <path d="M11.8777 35.5121C14.6128 31.8508 18.9808 29.4805 23.9025 29.4805C27.4061 29.4805 30.6292 30.6817 33.1824 32.6948" stroke="${textColor}" stroke-width="3.42857" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.7584 45.5524H6.75844C5.62183 45.5524 4.53171 45.1007 3.728 44.2971C2.92428 43.4936 2.47275 42.4034 2.47275 41.2668V6.98104C2.47275 5.84439 2.92428 4.75432 3.728 3.95057C4.53171 3.14684 5.62183 2.69531 6.75844 2.69531H41.0442C42.1808 2.69531 43.2708 3.14684 44.0748 3.95057C44.8784 4.75432 45.3301 5.84439 45.3301 6.98104V22.5" stroke="${textColor}" stroke-width="3.42857" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23.9013 23.0525C27.4517 23.0525 30.3299 20.1743 30.3299 16.6239C30.3299 13.0735 27.4517 10.1953 23.9013 10.1953C20.3509 10.1953 17.4727 13.0735 17.4727 16.6239C17.4727 20.1743 20.3509 23.0525 23.9013 23.0525Z" stroke="${textColor}" stroke-width="3.42857" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M32.1281 46.7171C30.6241 46.4552 30.6241 44.2962 32.1281 44.0346C37.5768 43.0867 41.9104 38.9365 43.0931 33.5339L43.1837 33.1198C43.5091 31.6334 45.6257 31.6241 45.9639 33.1076L46.074 33.5903C47.3006 38.9674 51.6351 43.0824 57.069 44.0277C58.5806 44.2907 58.5806 46.4608 57.069 46.724C51.6351 47.669 47.3006 51.7841 46.074 57.1614L45.9639 57.644C45.6257 59.1272 43.5091 59.1182 43.1837 57.6315L43.0931 57.2175C41.9104 51.815 37.5768 47.6647 32.1281 46.7171Z" stroke="${textColor}" stroke-width="3.42857" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_6749_3864">
      <rect width="60" height="60" fill="black"/>
    </clipPath>
  </defs>
</svg>
`;

    const floatingButtonSvgDataUri = `data:image/svg+xml,${encodeURIComponent(
      floatingButtonSvg,
    )}`;

    const closeButtonSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 2L17 17M17 2L2 17" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    const closeButtonSvgDataUri = `data:image/svg+xml,${encodeURIComponent(
      closeButtonSvg,
    )}`;
    // END OF ASSETS ///////////////////////////////////////////////////////////////
    styleElement.sheet.insertRule(keyframesModalPulse, 0);
    styleElement.sheet.insertRule(keyframesModalSelectFadeIn, 0);
    styleElement.sheet.insertRule(keyframesModalSelectFadeOut, 0);
    styleElement.sheet.insertRule(hovered, 0);

    const fontLink = document.createElement("link");
    if (!fontLink) console.error("error creating fontLink");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css?family=Urbanist:300,300i,400,400i,700,700i";

    // START FLOATING BUTTON
    const clinicosFlowDiv = document.createElement("div");
    if (!clinicosFlowDiv) console.error("error creating clinicosFlowDiv");
    clinicosFlowDiv.id = "clinicos-flow";
    clinicosFlowDiv.style.all = "initial";
    clinicosFlowDiv.style.display = "flex";
    clinicosFlowDiv.style.gap = "10px";
    clinicosFlowDiv.style.zIndex = "2147483646";
    clinicosFlowDiv.style.position = "fixed";
    if (ctaPosition === "side" && !isMobile) {
      clinicosFlowDiv.style.flexDirection = "row";
    } else {
      clinicosFlowDiv.style.flexDirection = "column";
    }
    if (isMobile) {
      clinicosFlowDiv.style.bottom = verticalOffsetMobile;
      if (ctaPositionMobile === "left") {
        clinicosFlowDiv.style.left = horizontalOffsetMobile;
        clinicosFlowDiv.style.alignItems = "flex-start";
      } else {
        clinicosFlowDiv.style.right = horizontalOffsetMobile;
        clinicosFlowDiv.style.alignItems = "flex-end";
      }
    } else {
      clinicosFlowDiv.style.bottom = verticalOffsetDesktop;
      if (ctaPositionDesktop === "left") {
        clinicosFlowDiv.style.left = horizontalOffsetDesktop;
        clinicosFlowDiv.style.alignItems = "flex-start";
      } else {
        clinicosFlowDiv.style.right = horizontalOffsetDesktop;
        clinicosFlowDiv.style.alignItems = "flex-end";
      }
    }

    const modalSelectDiv = document.createElement("div");
    if (!modalSelectDiv) console.error("error creating modalSelectDiv");
    modalSelectDiv.id = "clinicos-flow__modal-select";
    modalSelectDiv.style.all = "initial";
    modalSelectDiv.style.position = "relative";
    modalSelectDiv.style.flexDirection = "column";
    modalSelectDiv.style.justifyContent = "center";
    modalSelectDiv.style.alignItems = "center";
    modalSelectDiv.style.padding = "12px";
    modalSelectDiv.style.width = "310px";
    if (isMobile) {
      if (isCtaOpenByDefaultMobile === "true")
        modalSelectDiv.style.display = "flex";
      else modalSelectDiv.style.display = "none";
    } else {
      if (isCtaOpenByDefaultDesktop === "true")
        modalSelectDiv.style.display = "flex";
      else modalSelectDiv.style.display = "none";
    }

    const modelSelectOpacityDiv = document.createElement("div");
    if (!modelSelectOpacityDiv)
      console.error("error creating modelSelectOpacityDiv");
    modelSelectOpacityDiv.id = "clinicos-flow__test-div";
    modelSelectOpacityDiv.style.all = "initial";
    modelSelectOpacityDiv.style.position = "absolute";
    modelSelectOpacityDiv.style.width = "100%";
    modelSelectOpacityDiv.style.height = "100%";
    modelSelectOpacityDiv.style.borderRadius = "16px";
    modelSelectOpacityDiv.style.background = "#F0F0F0";
    modelSelectOpacityDiv.style.opacity = "0.8";

    const selectFirstOptionDiv = document.createElement("div");
    if (!selectFirstOptionDiv)
      console.error("error creating selectFirstOptionDiv");
    selectFirstOptionDiv.style.all = "initial";
    selectFirstOptionDiv.style.fontFamily =
      "Urbanist, Times New Roman, Times, serif";
    selectFirstOptionDiv.style.zIndex = "1";
    selectFirstOptionDiv.style.cursor = "pointer";
    selectFirstOptionDiv.style.display = "flex";
    selectFirstOptionDiv.style.flexDirection = "column";
    selectFirstOptionDiv.style.justifyContent = "center";
    selectFirstOptionDiv.style.alignItems = "center";
    selectFirstOptionDiv.style.borderRadius = "50px";
    selectFirstOptionDiv.style.padding = "12px 20px";
    selectFirstOptionDiv.style.boxSizing = "border-box";
    selectFirstOptionDiv.style.fontWeight = "600";
    selectFirstOptionDiv.style.width = "100%";
    selectFirstOptionDiv.style.textAlign = "center";
    selectFirstOptionDiv.style.background = `${themeColor}`;
    selectFirstOptionDiv.style.color = `${textColor}`;
    selectFirstOptionDiv.textContent = "Simulate your next procedure";

    const factTextContainer = document.createElement("div");
    if (!factTextContainer) console.error("error creating factTextContainer");
    factTextContainer.style.all = "initial";
    factTextContainer.style.fontFamily =
      "Urbanist, Times New Roman, Times, serif";
    factTextContainer.style.zIndex = "1";
    factTextContainer.style.boxSizing = "border-box";
    factTextContainer.style.textAlign = "center";
    factTextContainer.style.fontWeight = "600";
    factTextContainer.style.height = "0px";
    factTextContainer.style.transition = "all 1s ease 0s";
    factTextContainer.style.overflow = "hidden";
    factTextContainer.style.whiteSpace = "pre-line";
    factTextContainer.style.margin = "auto";
    factTextContainer.textContent =
      "Did you know.. People who set clear expectations with their surgeon for a BBL are 30% happier with thier results?";

    const buttonImgDiv = document.createElement("div");
    if (!buttonImgDiv) console.error("error creating buttonImgDiv");
    buttonImgDiv.id = "clinicos-flow__open-modal-btn";
    buttonImgDiv.src = floatingButtonSvgDataUri;
    buttonImgDiv.draggable = false;
    buttonImgDiv.style.all = "initial";
    buttonImgDiv.style.cursor = "pointer";
    buttonImgDiv.style.backgroundColor = `${themeColor}`;
    buttonImgDiv.style.overflow = "hidden";
    buttonImgDiv.style.boxShadow = "0 0 0 0 #5A99D4";
    buttonImgDiv.style.borderRadius = "100px";
    buttonImgDiv.style.padding = "20px 10px 10px 20px";
    buttonImgDiv.style.height = "40px";
    buttonImgDiv.style.width = "40px";
    buttonImgDiv.style.aspectRatio = "1";
    buttonImgDiv.style.animation = "buttonPulse 10s infinite";
    buttonImgDiv.style.boxShadow = `0 0 0 0 ${themeColor}`;
    buttonImgDiv.style.transform = "scale(1)";
    buttonImgDiv.style.position = "relative";
    buttonImgDiv.style.transition = "all 1s ease 0s";
    if (ctaPosition === "above") {
      buttonImgDiv.style.marginBottom = "auto";
    } else {
      buttonImgDiv.style.marginTop = "auto";
    }
    buttonImgDiv.addEventListener("touchend", function () {
      buttonImgDiv.classList.remove("clinicos-flow__hovered");
    });
    buttonImgDiv.addEventListener("mouseenter", function () {
      buttonImgDiv.classList.add("clinicos-flow__hovered");
    });
    buttonImgDiv.addEventListener("mouseleave", function () {
      buttonImgDiv.classList.remove("clinicos-flow__hovered");
    });
    let lastClickTime = 0;
    buttonImgDiv.onclick = function (event) {
      const debounceTime = 700;
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime < debounceTime) {
        return;
      }
      lastClickTime = currentTime;
      handleModalButtonOnClick(event);
    };

    const buttonImg = document.createElement("img");
    if (!buttonImg) console.error("error creating buttonImg");
    buttonImg.id = "clinicos-flow__open-modal-btn";
    buttonImg.src = floatingButtonSvgDataUri;
    buttonImg.draggable = false;
    buttonImg.style.all = "initial";
    buttonImg.style.cursor = "pointer";
    buttonImg.style.width = "35px";
    buttonImg.style.height = "35px";
    buttonImg.style.pointerEvents = "none";
    buttonImg.style.userSelect = "none";
    // END FLOATING BUTTON

    // START IFRAME MOBILE
    const iframeOnboardingTier1MobileWrapper = document.createElement("div");
    if (!iframeOnboardingTier1MobileWrapper)
      console.error("error creating iframeOnboardingTier1MobileWrapper");
    iframeOnboardingTier1MobileWrapper.id =
      "clinicos-flow__iframe-onboarding-tier-1-mobile-wrapper";
    iframeOnboardingTier1MobileWrapper.style.all = "initial";
    iframeOnboardingTier1MobileWrapper.style.backgroundColor = "white";
    iframeOnboardingTier1MobileWrapper.style.zIndex = "2147483647";
    iframeOnboardingTier1MobileWrapper.style.position = "fixed";
    iframeOnboardingTier1MobileWrapper.style.top = "0";
    iframeOnboardingTier1MobileWrapper.style.left = "100%";
    iframeOnboardingTier1MobileWrapper.style.width = "100%";
    iframeOnboardingTier1MobileWrapper.style.height = "100%";
    iframeOnboardingTier1MobileWrapper.style.transition = "left 0.5s ease 0s";
    iframeOnboardingTier1MobileWrapper.style.background = "#ffffff";

    const iframeOnboardingTier1Mobile = document.createElement("iframe");
    if (!iframeOnboardingTier1Mobile)
      console.error("error creating iframeOnboardingTier1Mobile");
    iframeOnboardingTier1Mobile.id =
      "clinicos-flow__iframe-onboarding-tier-1-mobile";
    if (formName) {
      iframeOnboardingTier1Mobile.src = `${onboardingTier1}`;
    }
    iframeOnboardingTier1Mobile.frameBorder = "0";
    iframeOnboardingTier1Mobile.scrolling = "no";
    iframeOnboardingTier1Mobile.allow = "camera";
    iframeOnboardingTier1Mobile.style.all = "initial";
    iframeOnboardingTier1Mobile.style.height = "100%";
    iframeOnboardingTier1Mobile.style.width = "100%";
    iframeOnboardingTier1Mobile.style.position = "relative";

    const closeModalButtonMobile = document.createElement("img");
    if (!closeModalButtonMobile)
      console.error("error creating closeModalButtonMobile");
    closeModalButtonMobile.draggable = false;
    closeModalButtonMobile.id = "clinicos-flow__close-modal-button-mobile";
    closeModalButtonMobile.src = closeButtonSvgDataUri;
    closeModalButtonMobile.alt = "close modal button";
    closeModalButtonMobile.style.all = "initial";
    closeModalButtonMobile.style.position = "fixed";
    closeModalButtonMobile.style.zIndex = "2147483647";
    closeModalButtonMobile.style.cursor = "pointer";
    closeModalButtonMobile.style.width = "18px";
    closeModalButtonMobile.style.height = "18px";
    closeModalButtonMobile.style.display = "none";
    closeModalButtonMobile.style.top = "5px";
    closeModalButtonMobile.style.right = "-8px";
    closeModalButtonMobile.style.padding = "15px";
    closeModalButtonMobile.addEventListener("click", function () {
      iframeOnboardingTier1MobileWrapper.style.left = "100%";
      closeModalButtonMobile.style.display = "none";
    });
    // END IFRAME MOBILE

    // START IFRAME DESKTOP
    const iframeWrapperDiv = document.createElement("div");
    if (!iframeWrapperDiv) console.error("error creating iframeWrapperDiv");
    iframeWrapperDiv.id = "clinicos-flow__iframe-wrapper";
    iframeWrapperDiv.style.all = "initial";
    iframeWrapperDiv.style.overflow = "hidden";
    iframeWrapperDiv.style.borderRadius = "16px";
    iframeWrapperDiv.style.width = "0px";
    iframeWrapperDiv.style.height = "0px";
    iframeWrapperDiv.style.transition =
      "width 0.5s linear, height 0.50s linear";
    iframeWrapperDiv.style.boxShadow = "0px 3px 12px #20222825";
    iframeWrapperDiv.style.background = "#ffffff";

    const iframeOnboardingTier1 = document.createElement("iframe");
    if (!iframeOnboardingTier1)
      console.error("error creating iframeOnboardingTier1");
    iframeOnboardingTier1.id = "clinicos-flow__iframe";
    if (formName) {
      iframeOnboardingTier1.src = `${onboardingTier1}`;
    }
    iframeOnboardingTier1.frameBorder = "0";
    iframeOnboardingTier1.scrolling = "no";
    iframeOnboardingTier1.allow = "camera";
    iframeOnboardingTier1.style.height = "680px";
    iframeOnboardingTier1.style.width = "380px";
    iframeOnboardingTier1.style.position = "relative";

    // END IFRAME DESKTOP

    // START ADDING ELEMENTS TO DOM
    document.head.appendChild(fontLink);
    document.body.appendChild(clinicosFlowDiv);
    document.body.appendChild(iframeOnboardingTier1MobileWrapper);
    document.body.appendChild(closeModalButtonMobile);
    modalSelectDiv.appendChild(factTextContainer);

    iframeOnboardingTier1MobileWrapper.appendChild(iframeOnboardingTier1Mobile);
    if (ctaPosition === "side" && !isMobile) {
      if (ctaPositionDesktop === "left") {
        clinicosFlowDiv.appendChild(buttonImgDiv);
        clinicosFlowDiv.appendChild(modalSelectDiv);
        clinicosFlowDiv.appendChild(iframeWrapperDiv);
      } else {
        clinicosFlowDiv.appendChild(iframeWrapperDiv);
        clinicosFlowDiv.appendChild(modalSelectDiv);
        clinicosFlowDiv.appendChild(buttonImgDiv);
      }
    } else {
      clinicosFlowDiv.appendChild(iframeWrapperDiv);
      clinicosFlowDiv.appendChild(modalSelectDiv);
      clinicosFlowDiv.appendChild(buttonImgDiv);
    }

    buttonImgDiv.appendChild(buttonImg);
    modalSelectDiv.appendChild(selectFirstOptionDiv);

    modalSelectDiv.appendChild(modelSelectOpacityDiv);
    iframeWrapperDiv.appendChild(iframeOnboardingTier1);
    // END FORM RANDOMIZATION

    // START EVENT LISTENERS
    function toggleSelections() {
      const computedStyle = window.getComputedStyle(modalSelectDiv);
      if (computedStyle.getPropertyValue("display") === "flex") {
        modalSelectDiv.style.animation =
          "modalSelectFadeOut 0.5s ease-in-out 0s";
        modalSelectDiv.style.display = "none";
      } else {
        modalSelectDiv.style.animation =
          "modalSelectFadeIn 0.5s ease-in-out 0s";
        modalSelectDiv.style.display = "flex";
      }
    }

    function toggleIframe(index) {
      if (isMobile) return;
      if (index === 0) {
        iframeOnboardingTier1.style.display = "initial";
      } else if (index === 1) {
        iframeOnboardingTier1.style.display = "none";
      } else {
      }

      const iframeWrapperStyle = window.getComputedStyle(iframeWrapperDiv);

      if (iframeWrapperStyle.getPropertyValue("height") === "0px") {
        const width = Math.max(iframeOnboardingTier1.offsetWidth);
        const height = Math.max(iframeOnboardingTier1.offsetHeight);
        iframeWrapperDiv.style.width = `${width}px`;
        iframeWrapperDiv.style.height = `${height}px`;
      } else {
        iframeWrapperDiv.style.width = "0px";
        iframeWrapperDiv.style.height = "0px";
      }
    }

    function handleModalButtonOnClick() {
      clinicosFlowDiv.style.animation = "none";
      // FOR MIXPANEL TRACKING
      if (isMobile) {
        iframeOnboardingTier1Mobile.contentWindow.postMessage(
          { message: "Form Opened" },
          "*",
        );
      } else {
        iframeOnboardingTier1.contentWindow.postMessage(
          { message: "Form Opened" },
          "*",
        );
      }

      if (isMobile) {
        iframeOnboardingTier1MobileWrapper.style.left = 0;
        closeModalButtonMobile.style.display = "block";
      } else {
        if (isCtaOpenByDefaultDesktop !== "true") {
          toggleIframe(0);
          return;
        }
        const modalSelectDivDsiplay = window
          .getComputedStyle(modalSelectDiv)
          .getPropertyValue("display");
        if (modalSelectDivDsiplay === "flex") {
          toggleSelections();
          setTimeout(() => {
            toggleIframe(0);
          }, 200);
        } else {
          toggleIframe(0);
          setTimeout(() => {
            toggleSelections();
          }, 510);
        }
      }
    }

    const options = document.querySelectorAll(
      "#clinicos-flow__modal-select div:not(:first-child):not(:last-child)",
    );
    options.forEach((opt, index) => {
      opt.addEventListener("click", function () {
        clinicosFlowDiv.style.animation = "none";

        // FOR MIXPANEL TRACKING
        if (isMobile) {
          iframeOnboardingTier1Mobile.contentWindow.postMessage(
            { message: "Form Opened" },
            "*",
          );
        } else {
          iframeOnboardingTier1.contentWindow.postMessage(
            { message: "Form Opened" },
            "*",
          );
        }
        // END OF MIXPANEL TRACKING

        if (isMobile) {
          if (index === 0) {
            iframeOnboardingTier1MobileWrapper.style.left = 0;
          }
          closeModalButtonMobile.style.display = "block";
          return;
        }

        toggleSelections();
        setTimeout(() => {
          toggleIframe(index);
        }, 510);
      });
    });
    // END EVENT LISTENERS

    // START IFRAME POSTMESSAGE
    if (formName) {
      iframeOnboardingTier1.setAttribute("allow", "autoplay; camera;");
      let iframeUrl = iframeOnboardingTier1.getAttribute("src");
      iframeOnboardingTier1.setAttribute("src", iframeUrl + "?v=2");

      iframeOnboardingTier1Mobile.setAttribute("allow", "autoplay; camera;");
      iframeUrl = iframeOnboardingTier1Mobile.getAttribute("src");
      iframeOnboardingTier1Mobile.setAttribute("src", iframeUrl + "?v=2");
    }
    // END IFRAME POSTMESSAGE

    // START SENDING URL TO IFRAME
    let formatUrl;
    let contextProcedure;
    let previousContextProcedure;
    let factTextContainerHeight = "80px";
    let timeoutId;

    setInterval(() => {
      // if form is open, don't send the url
      if (
        iframeOnboardingTier1MobileWrapper.style.left !== "100%" ||
        iframeWrapperDiv.style.width !== "0px"
      )
        return;

      if (iframeWrapperDiv.style.width !== "0px") return;

      if (window.location.href === formatUrl) return;
      formatUrl = window.location.href
        .replace(" ", "")
        .replace("-", "")
        .replace("_", "")
        .toLowerCase();

      if (
        formatUrl.includes("tummytuck") ||
        formatUrl.includes("abdominoplasty") ||
        formatUrl.includes("abdominalcontouring") ||
        formatUrl.includes("bellytuck") ||
        formatUrl.includes("abdominalsculpting") ||
        formatUrl.includes("abdominalskinremoval")
      ) {
        contextProcedure = "TUMMY_TUCK";
      } else if (
        formatUrl.includes("bbl") ||
        formatUrl.includes("brazilianbuttlift") ||
        formatUrl.includes("buttockaugmentation") ||
        formatUrl.includes("buttockenhancement") ||
        formatUrl.includes("buttocklift") ||
        formatUrl.includes("buttocksculpting") ||
        formatUrl.includes("butt")
      ) {
        contextProcedure = "BBL";
      } else if (
        formatUrl.includes("breastaug") ||
        formatUrl.includes("breastimplants") ||
        formatUrl.includes("breastimplant") ||
        formatUrl.includes("boobjob") ||
        formatUrl.includes("breastenhancement") ||
        formatUrl.includes("breastaugmentation")
      ) {
        contextProcedure = "BREAST_AUGMENTATION";
      } else if (
        formatUrl.includes("breastlift") ||
        formatUrl.includes("mastopexy")
      ) {
        contextProcedure = "BREAST_LIFT";
      } else if (
        formatUrl.includes("breastreduction") ||
        formatUrl.includes("reductionmammoplasty") ||
        formatUrl.includes("mammaryreduction") ||
        formatUrl.includes("breastcontouring") ||
        formatUrl.includes("breastreshaping")
      ) {
        contextProcedure = "BREAST_REDUCTION";
      } else if (
        formatUrl.includes("breastliftandaug") ||
        formatUrl.includes("breastliftandimplants") ||
        formatUrl.includes("breastliftandaugmentation")
      ) {
        contextProcedure = "BREAST_LIFT_AND_AUGMENTATION";
      } else {
        contextProcedure = null;
      }
      const message = {
        message: "Context Procedure Update",
        payload: {
          contextProcedure: contextProcedure,
        },
      };

      if (contextProcedure && contextProcedure !== previousContextProcedure) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          factTextContainer.style.height = factTextContainerHeight;
          timeoutId = setTimeout(() => {
            factTextContainer.style.height = "0px";
            timeoutId = null;
          }, 7000);
        }
        selectFirstOptionDiv.textContent = `Simulate your next ${shortenProcedureString(contextProcedure)}`;
        if (contextProcedure === "BREAST_AUGMENTATION") {
          factTextContainer.textContent =
            "Did you know..\n17% of women who get breast\n implants wish they'd gone bigger?";
        }
        if (contextProcedure === "BREAST_LIFT") {
          factTextContainer.textContent =
            "Did you know..\nA breast lift can make your breasts\nlook 10 years younger?";
        }
        if (contextProcedure === "BREAST_REDUCTION") {
          factTextContainer.textContent =
            "Did you know..\n95% of women who get a breast\nreduction report immediate relief\nfrom back pain?";
        }
        if (contextProcedure === "BREAST_LIFT_AND_AUGMENTATION") {
          factTextContainer.textContent =
            "Did you know..\nCombining a breast lift with reduction can enhance both shape\nand comfort, leading to a more youthful appearance\nand immediate pain relief?";
        }
        if (contextProcedure === "BBL") {
          factTextContainer.textContent =
            "Did you know..\nPeople who set clear expectations\nwith their surgeon for a BBL are 30%\nhappier with their results?";
        }
        if (contextProcedure === "TUMMY_TUCK") {
          factTextContainer.textContent =
            "Did you know..\nOver 90% of tummy tuck patients\nreport improved self-confidenceand\nsatisfaction with their body contour?";
        }
        factTextContainer.style.height = factTextContainerHeight;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          factTextContainer.style.height = "0px";
          timeoutId = null;
        }, 7000);
      }
      if (!contextProcedure) {
        selectFirstOptionDiv.textContent = "Simulate your next procedure";
        factTextContainer.style.height = "0px";
      }

      previousContextProcedure = contextProcedure;

      iframeOnboardingTier1Mobile.contentWindow.postMessage(message, "*");
      iframeOnboardingTier1.contentWindow.postMessage(message, "*");
      modelSelectOpacityDiv.style.display = "flex";
    }, 1000);
    // END SENDING URL TO IFRAME
  });
