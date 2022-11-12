document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  commonEvent();
  commonForm();
  bottomLayer();
  dataClampMore();
});
window.addEventListener("load", function() {});

function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }


  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

function commonEvent() {
  const page_wrap2 = document.querySelector(".page_wrap.layout_type2");
  let windowWidth = 0;
  action();
  setVh();
  window.addEventListener("resize", () => {
    if (windowWidth === window.innerWidth) {
      return;
    }
    setVh();
    action();
    windowWidth = window.innerWidth;
  });
  window.addEventListener("touchmove", () => {
    if (window.scrollY === 0) {
      setVh();
    }
  });
  // let div = document.createElement("div");
  // div.setAttribute("style","position:fixed;top:0;right:0;background:red;color:#fff;padding:10px;z-index:10000000");
  // div.setAttribute("id","test");
  // document.querySelector("body").append(div);

  function setVh() {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    function action() {
      if (page_wrap2 == null) {
        return;
      }
      page_wrap2.style.minHeight = `${window.innerHeight}px`;
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    action();
  };

  function action() {
    commonTitle();

    function commonTitle() {
      const header_wrap = document.querySelector(".header_wrap");
      const headerTitle = document.querySelector(".header_title");
      if (header_wrap === null) {
        return
      }
      const headerElements = [].slice.call(header_wrap.children);
      let headerElementsWid = [];
      let headerElementsWidMax = 0;
      headerElements.forEach((element) => {
        if (element.classList.contains("header_title")) {
          return;
        }
        headerElementsWid.push(element.getBoundingClientRect().width)
      });
      headerElementsWidMax = Math.max.apply(null, headerElementsWid);
      // let btn_total_wid = btn_total !== null ? btn_total.getBoundingClientRect().width : 0;
      // const header_util_wrap = document.querySelector(".header_util_wrap");
      // let header_util_wrap_wid = header_util_wrap !== null ? header_util_wrap.getBoundingClientRect().width : 0;
      if (headerTitle !== null) {
        headerTitle.style.paddingLeft = headerElementsWidMax + "px";
        headerTitle.style.paddingRight = headerElementsWidMax + "px";
      }
    }
  }
}

function resizeForm() {
  const item_data_form_row = document.querySelectorAll(".item_data_form_row");
  item_data_form_row.forEach((element) => {
    const thisObj = element;
    const thisObjTextarea = thisObj.querySelector(".item_data_ta");
    const thisObjHiddenData = thisObj.querySelector(".hidden_data_ta");

    resizeAction();

    thisObjTextarea.addEventListener("input", (e) => {
      let etarget = e.target;
      thisObjHiddenData.remove();
      inputAction(etarget);
    });

    thisObjTextarea.addEventListener("focusout", (e) => {
      let etarget = e.target;
      if (etarget.value.length === 0) {
        etarget.style.removeProperty("height");
      }
    });


  });
  window.addEventListener("resize", (e) => {
    let etarget = e.target;
    resizeAction();
  });

  function inputAction(target) {
    let etarget = target;

    etarget.style.height = (etarget.scrollHeight) + 'px';
  }

  function resizeAction() {
    item_data_form_row.forEach((element) => {
      let thisObj = element;
      let thisObjTextarea = thisObj.querySelector(".item_data_ta");
      let thisObjHiddenData = thisObj.querySelector(".hidden_data_ta");
      if (thisObjTextarea.value.length) {
        thisObjHiddenData.innerHTML = thisObjTextarea.value;
        thisObjTextarea.style.height = `${thisObjHiddenData.getBoundingClientRect().height}px`;
      }
    });
  }

}


function DesignModal(option) {
  this.message = option.message;
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.design_modal_wrap = null;
  this.btn_dmsmidentify = null;
  this.btn_dmsmcancel = null;
  this.duration = option.duration !== undefined ? option.duration : 400;

  this.initShow(option);
}

DesignModal.prototype.initShow = function(option) {
  var innerPublish = '';
  var objThis = this;

  // innerPublish += "<div class='design_modal_wrap'>";
  // innerPublish += "  <div class='bg_design_modal'></div>";
  // innerPublish += "  <div class='design_modal_w'>";
  // innerPublish += "          <div class='design_modal'>";
  // innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
  // innerPublish += "              <div class='btn_dmsm_wrap'>";
  // innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
  // if (option.type === "confirm") {
  //   innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
  // }
  // innerPublish += "              </div>";
  // innerPublish += "          </div>";
  // innerPublish += "  </div>";
  // innerPublish += "</div>";



  this.modalparent = document.createElement('div');
  this.pagewrap.appendChild(this.modalparent);
  this.modalparent.classList.add("design_modal_insert_wrap");
  let btnCloseText = option.btnCloseText !== undefined ? option.btnCloseText : '닫기';
  let btnMainText = option.btnMainText !== undefined ? option.btnMainText : '확인';
  this.modalparent.innerHTML = `
    <div class='design_modal_wrap'>
        <div class='bg_design_modal'></div>
        <div class='design_modal_w'>
            <div class='design_modal'>
                <div class='design_modal_cont_w'>
                    <div class='design_modal_text'></div>
                </div>
                <div class='btn_dmsm_wrap'>
                    <a href='javascript:;' class='btn_dmsm close_dmtrigger'>${btnCloseText}</a>
                    ${option.type === "confirm" ? `<a href='javascript:;' class='btn_dmsm close_dmtrigger btn_main'>${btnMainText}</a>` : ``}
                </div>
            </div>
        </div>
    </div>`;

  if (option.type === "confirm" || option.type === "alert") {
    this.design_modal_text = document.querySelector(".design_modal_text");
    this.design_modal_text.innerHTML = option.message;
  }
  this.btn_main = this.modalparent.querySelector(".btn_main");
  this.pagewrap.style.zIndex = 0;
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset + "px";
  this.domHtml.classList.add("touchDis");
  this.design_modal_wrap = document.querySelector(".design_modal_wrap");
  this.closetrigger = document.querySelectorAll(".close_dmtrigger");
  this.design_modal_wrap.classList.add("active");

  if (option.type === "alert") {
    this.design_modal_wrap.classList.add("alert_type");
  }
  setTimeout(function() {
    objThis.design_modal_wrap.classList.add("motion");
  }, 30);
  this.bindEvent(option);
}
DesignModal.prototype.removeHide = function(option) {
  var objThis = this;
  this.design_modal_wrap.classList.remove("motion");
  setTimeout(() => {
    objThis.design_modal_wrap.classList.remove("active");
    document.querySelector(".design_modal_insert_wrap").remove();
    objThis.design_modal_wrap.remove();
    objThis.domHtml.classList.remove("touchDis");
    objThis.domBody.style.marginTop = 0;

    window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));

    if (option !== undefined) {
      if ("closeCallback" in option) {
        option.closeCallback();
      }
    }
  }, 530);
}
DesignModal.prototype.bindEvent = function(option) {
  var objThis = this;
  for (var i = 0; i < this.closetrigger.length; i++) {
    this.closetrigger[i].addEventListener("click", function() {
      objThis.removeHide(option);
    }, false);
  }



  if (this.btn_main !== null) {
    this.btn_main.addEventListener("click", function() {
      setTimeout(() => {
        if ("btnMainCallback" in option) {
          option.btnMainCallback();
        }
      }, 530);
    }, false);
  }
}




function DesignPopup(option) {
  this.selector = null;
  if (option.selector !== undefined) {
    this.selector = document.querySelector(option.selector);
  }
  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.btn_closeTrigger = null;
  this.btn_close = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;
  this.popupShow(option);
}

DesignPopup.prototype.popupShow = function(option) {
  var objThis = this;
  this.selector = document.querySelector(option.selector);
  if (this.selector == null) {
    return;
  }
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset + "px";
  this.scrollValue = window.pageYOffset;
  this.domHtml.classList.add("touchDis");
  this.selector.classList.add("active");
  setTimeout(function() {
    objThis.selector.classList.add("motion");
    if ("callback" in option) {
      option.callback();
    }
  }, 30);


  this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
  this.btn_close = this.selector.querySelectorAll(".popup_close");
  this.bg_design_popup = this.selector.querySelector(".popup_wrap .bg_dim");
  this.domBody.append(this.selector);
  this.bindEvent(this.selector);
  commonForm();
}
DesignPopup.prototype.popupHide = function(target) {
  var objThis = this;
  if (target !== undefined) {
    if (typeof target == "object") {
      this.selector = target;
    } else {
      this.selector = document.querySelector(target);
    }
    this.selector.classList.remove("motion");
    setTimeout(function() {
      //remove
      objThis.selector.classList.remove("active");
      objThis.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      if (objThis.design_popup_wrap_active.length == 0) {
        objThis.domHtml.classList.remove("touchDis");
        objThis.domBody.style.marginTop = 0;
        window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
      }
    }, 420);
  }
}

DesignPopup.prototype.bindEvent = function() {
  var objThis = this;
  var closeItemArray = [...this.btn_closeTrigger, ...this.btn_close];
  if (this.bg_design_popup !== null) {
    closeItemArray.push(this.bg_design_popup);
  }
  if (closeItemArray.length) {
    closeItemArray.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        this.popupHide(objThis.selector);
      }, false);
    });
  }
};





function commonForm() {
  addDynamicEventListener(document.body, 'change', '.form_select', function(e) {
    let thisTarget = e.target;
    if (thisTarget.value === "0") {
      thisTarget.classList.add("ready");
    } else {
      thisTarget.classList.remove("ready");
    }
  });
  let form_input = document.querySelectorAll(".form_input");
  if (form_input.length) {
    form_input.forEach(function(elem, index) {
      elem.addEventListener("focus", function(e) {
        focusInAction(e.currentTarget);
      }, false);
      elem.addEventListener("keydown", function(e) {
        focusInAction(e.currentTarget);
      }, false);
      elem.addEventListener("keypress", function(e) {
        focusInAction(e.currentTarget);
      }, false);

      elem.addEventListener("focusout", function(e) {
        focusOutAction(e.currentTarget);
      }, false);
    });
  }

  function focusInAction(target) {
    let currentTarget = target;
    let currentParent = currentTarget.closest(".form_element_group");
    if (currentParent !== null) {
      currentParent.classList.add("active");
    }
  }

  function focusOutAction(target) {
    let currentTarget = target;
    let currentParent = currentTarget.closest(".form_element_group");
    if (currentParent !== null) {
      currentParent.classList.remove("active");
    }
  }
}

function scrollHasCont(target) {
  if (target === null || target === undefined) {
    return;
  }
  let targetDom = document.querySelectorAll(target);
  if (targetDom.length === 0) {
    return;
  }
  targetDom.forEach((element) => {
    let thisElement = element;
    let thisElementContent = [].slice.call(thisElement.children)[0];
    thisElementContent.style.marginRight = `-${getScrollBarWidth()}px`
    //thisElementContent.style.marginRight = `-10px`
    //thisElement.style.paddingRight = `${thisElement.getBoundingClientRect().width - thisElementContent.getBoundingClientRect().width}px`
  });
}


function getScrollBarWidth() {
  let outerDivitem = document.createElement('div');
  let innerDivitem = document.createElement('div');
  let getWidth = 0;
  outerDivitem.setAttribute("style", `width: 100px; overflow:scroll; height:100px;outline:1px solid red`)
  document.body.append(outerDivitem);
  outerDivitem.append(innerDivitem);
  innerDivitem.setAttribute("style", `width: 100%;height:110%;`)
  getWidth = innerDivitem.getBoundingClientRect().width;
  outerDivitem.remove();
  return 100 - getWidth;
};

function bottomLayer() {
  const bottom_layer = document.querySelector(".bottom_layer");
  const page_wrap = document.querySelector(".page_wrap");

  action();
  window.addEventListener("resize", () => {
    action();
  });

  function action() {
    if (bottom_layer !== null) {
      page_wrap.style.paddingBottom = `${bottom_layer.getBoundingClientRect().height}px`;
    }
  }
}


function floatingMenu() {
  document.querySelector(".btn_gnb_call").addEventListener("click", (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("hidden");
    document.querySelector(".gnb_list_wrap").classList.add("active");
    document.querySelector(".btn_gnb_close").classList.add("active");
  }, false);
  document.querySelector(".btn_gnb_close").addEventListener("click", (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("active");
    document.querySelector(".gnb_list_wrap").classList.remove("active");
    document.querySelector(".btn_gnb_call").classList.remove("hidden");
  }, false);
}



function scrollTabFunc() {
  const document_html = document.querySelector("html");
  const both_list_wrap = document.querySelector(".both_list_wrap");
  let both_list_wrap_pos = both_list_wrap.getBoundingClientRect().top;
  const btn_sortbox = document.querySelectorAll(".btn_sortbox");
  const proitem_list = document.querySelectorAll(".proitem_list");
  let pos_array = getPos();

  // init
  setTimeout(() => {
    window.scrollTo(0, 0);
    document_html.classList.add("smooth");
  }, 20);

  // event
  let current_active = document.querySelector(".btn_sortbox.active");
  var btn_click_is = false;
  let scroll_value = window.scrollY;
  btn_sortbox.forEach((element, index) => {
    element.addEventListener("mouseover", (e) => {
      btn_click_is = true;
    });
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let thisEventObj = e.currentTarget;
      pos_array = getPos();
      activeTab(thisEventObj);
      setTimeout(() => {
        goScroll(pos_array[index]);
      }, 30);
      btn_click_is = true;
    });
  });

  window.addEventListener("scroll", () => {
    let scroll_value = window.scrollY;
    pos_array = getPos();
    if (btn_click_is) {
      return;
    }
    btn_sortbox.forEach((element, index) => {
      if (scroll_value >= pos_array[index]) {
        activeTab(element);
      }
    });
  });
  window.addEventListener("touchstart", () => {
    btn_click_is = false;
  });
  window.addEventListener("mousewheel", () => {
    btn_click_is = false;
  });
  window.addEventListener("mousedown", () => {
    btn_click_is = false;
  });

  function goScroll(pos) {
    window.scrollTo(0, pos);
    // window.scrollTo({ top: pos, left: 0, behavior: 'smooth'});
  }

  function activeTab(target) {
    if (current_active !== null) {
      current_active.classList.remove("active");
    }
    target.classList.add("active");
    current_active = target;
  }

  function getPos() {
    let proitem_list_pos_array = [];
    proitem_list.forEach((element) => {
      let loofPos = element.getBoundingClientRect().top + window.scrollY;
      proitem_list_pos_array.push(loofPos);
    });
    proitem_list_pos_array[0] = 0;
    return proitem_list_pos_array;
  }
}

function dataClampMore() {
  let moreToggleBtn = document.querySelectorAll("[data-moreToggle]");
  if (moreToggleBtn.length === 0) {
    return;
  }
  moreToggleBtn.forEach((element) => {
    let thisElement = element;
    let toggleIs = false;
    let thisElementText = thisElement.textContent;
    element.addEventListener("click", (e) => {
      let thisEventObj = e.currentTarget;
      let thisElementToggle = thisEventObj.getAttribute("data-moreToggle");
      let thisEventObjTarget = document.querySelector(thisEventObj.getAttribute("href"));
      e.preventDefault();
      console.log(thisEventObjTarget);
      if (toggleIs) {
        thisEventObj.textContent = thisElementText;
        thisEventObjTarget.classList.remove("fullshow");
      } else {
        thisEventObj.textContent = thisElementToggle;
        thisEventObjTarget.classList.add("fullshow");
      }
      toggleIs = !toggleIs;
    })
  });
}

function tabMenuActive(target) {
  let targetDom = document.querySelectorAll(target);
  targetDom.forEach((element) => {
    let thisEach = element;
    let thisEachMenu = thisEach.querySelectorAll("li > a");
    let currentItem = thisEach.querySelector("li.active");
    thisEachMenu.forEach((elementMenu) => {
      elementMenu.addEventListener("click", (e) => {
        e.preventDefault();
        let thisCurrentLi = e.currentTarget.closest("li");
        if (currentItem !== null) {
          currentItem.classList.remove("active");
        }
        thisCurrentLi.classList.add("active");
        currentItem = thisCurrentLi;
      });
    });
  });
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}