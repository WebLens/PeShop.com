(() => {
  "use strict";
  class t {
    constructor(t) {
      let e = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...e,
          ...t,
          classes: { ...e.classes, ...t?.classes },
          hashSettings: { ...e.hashSettings, ...t?.hashSettings },
          on: { ...e.on, ...t?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (t) {
          const e = t.target.closest(`[${this.options.attributeOpenButton}]`);
          if (e)
            return (
              t.preventDefault(),
              (this._dataValue = e.getAttribute(
                this.options.attributeOpenButton
              )
                ? e.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = e),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${e.classList}`
                  )
            );
          return t.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!t.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (t.preventDefault(),
              this.close(),
              void document.querySelector(".shop-column-popup").remove())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (t) {
            if (
              this.options.closeEsc &&
              27 == t.which &&
              "Escape" === t.code &&
              this.isOpen
            )
              return (
                t.preventDefault(),
                this.close()
              );
            this.options.focusCatch &&
              9 == t.which &&
              this.isOpen &&
              this._focusCatch(t);
          }.bind(this)
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (t) {
              const e = t.detail.form.dataset.popupMessage;
              e && this.open(e);
            }.bind(this)
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(t) {
      if (
        (t &&
          "string" == typeof t &&
          "" !== t.trim() &&
          ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            e = document.createElement("iframe");
          e.setAttribute("allowfullscreen", "");
          const o = this.options.setAutoplayYoutube ? "autoplay;" : "";
          e.setAttribute("allow", `${o}; encrypted-media`),
            e.setAttribute("src", t),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(e);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : o(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(t) {
      t &&
        "string" == typeof t &&
        "" !== t.trim() &&
        (this.previousOpen.selector = t),
        this.isOpen &&
          e &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            o(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let t = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${t}"]`) &&
        t &&
        this.open(t);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(t) {
      const e = this.targetOpen.element.querySelectorAll(this._focusEl),
        o = Array.prototype.slice.call(e),
        s = o.indexOf(document.activeElement);
      t.shiftKey && 0 === s && (o[o.length - 1].focus(), t.preventDefault()),
        t.shiftKey || s !== o.length - 1 || (o[0].focus(), t.preventDefault());
    }
    _focusTrap() {
      const t = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : t[0].focus();
    }
    popupLogging(t) {
      this.options.logging && a(`[Попапос]: ${t}`);
    }
  }
  let e = !0,
    o = (t = 500) => {
      document.documentElement.classList.contains("lock") ? s(t) : i(t);
    },
    s = (t = 500) => {
      let o = document.querySelector("body");
      if (e) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < s.length; t++) {
            s[t].style.paddingRight = "0px";
          }
          (o.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, t);
      }
    },
    i = (t = 500) => {
      let o = document.querySelector("body");
      if (e) {
        let s = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < s.length; t++) {
          s[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (o.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, t);
      }
    };
  const n = () => new t({});
  function a(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  let c = (t, e = !1, o = 500, i = 0) => {
    const n = document.querySelector(t);
    if (n) {
      let c = "",
        l = 0;
      e &&
        ((c = "header.header"), (l = document.querySelector(c).offsetHeight));
      let r = {
        speedAsDuration: !0,
        speed: o,
        header: c,
        offset: i,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (s(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", r);
      else {
        let t = n.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? t - l : t, behavior: "smooth" });
      }
      a(`[gotoBlock]: Юхуу...едем к ${t}`);
    } else a(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
  };
  let l = !1;
  setTimeout(() => {
    if (l) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0);
  var r = { artuom: "11", masha: "18" };
  if (
    ($(".form-autorisation__inpt").on("click", function () {
      $("input[name='users']").is(":checked") &&
        ($(".value-res").removeClass("value-res"),
        $(".form-autorisation__label-act").removeClass(
          "form-autorisation__label-act"
        ),
        $(this).parent().addClass("form-autorisation__label-act"),
        $(this).addClass("value-res"));
    }),
    $(".form-autorisation__btn").on("click", function () {
      if ($("input[name='users']").is(":checked")) {
        let t = document.querySelector(".value-res").value;
        "guest" == t &&
          ($(this).attr("data-popup", ""),
          (document.location.href = "home.html")),
          "user" == t && $(this).attr("data-popup", "#popup_autorisation");
      }
    }),
    $(".form-popap__btn").on("click", function () {
      let t = document.querySelector("#login").value,
        e = document.querySelector("#psw").value;
      Object.keys(r).forEach(function (o) {
        console.log(o, ":", this[o]),
          t == o && this[o] == e
            ? ((document.location.href = "home.html"), startShop())
            : (document.querySelector(".mistake").innerText =
                "Не верный логин или пароль!");
      }, r);
    }),
    "Главная" == document.title)
  ) {
    var p = [];
    (p[0] = {
      id: "0",
      name: "Кроссовок Nuke",
      desc: "Кроссовки для тех, кто хочет выглядеть эффектно даже во время тренировок по бездорожью",
      price: "3000",
      qty: "500",
      img: "img/shop/nuke_trein.jpg",
    }),
      (p[1] = {
        id: "1",
        name: "Кепка Kocherg",
        desc: "Кепка Kocherga Turbo  – незаменимый аксессуар для спортсмена",
        price: "306",
        qty: "200",
        img: "img/shop/cap_kocherga.jpg",
      }),
      (p[2] = {
        id: "2",
        name: "Шорты Abibas",
        desc: "Короткие, выше колена штаны или брюки прямиком из лап тренера",
        price: "10100",
        qty: "100",
        img: "img/shop/shots_abibas.jpg",
      }),
      (p[3] = {
        id: "3",
        name: "Шорты Abibasf",
        desc: "Короткие, выше колена штаны или брюки прямиком из лап тренера",
        price: "1000",
        qty: "100",
        img: "img/shop/shots_abibas.jpg",
      }),
      (p[4] = {
        id: "4",
        name: "Шорты Abibasa",
        desc: "Короткие, выше колена штаны или брюки прямиком из лап тренера",
        price: "100",
        qty: "100",
        img: "img/shop/shots_abibas.jpg",
      });
    for (let t = 0; t < p.length; t++) {
      let e = document.querySelector(".shop__row"),
        o = document.createElement("div");
      o.classList.add("shop__column"),
        o.classList.add("column-shop"),
        e.appendChild(o);
      let s = document.createElement("img");
      o.appendChild(s);
      let i = document.createElement("div");
      i.classList.add("column-shop__body"), o.appendChild(i);
      let n = document.createElement("h3");
      n.classList.add("column-shop__title"), i.appendChild(n);
      let a = document.createElement("div");
      a.classList.add("column-shop__desc"), i.appendChild(a);
      let c = document.createElement("p");
      c.classList.add("column-shop__price"), o.appendChild(c);
      let l = document.createElement("button");
      l.setAttribute("data-popup", "#popup"),
        l.classList.add("column-shop__button"),
        l.classList.add("button"),
        (l.innerText = "Заказать"),
        o.appendChild(l),
        Object.keys(p[t]).forEach(function (t) {
          "img" == t && (s.src = this[t]),
            "name" == t && (n.innerText = this[t]),
            "desc" == t && (a.innerText = this[t]),
            "price" == t && (c.innerText = this[t] + " р."),
            "id" == t && (l.id = this[t]);
        }, p[t]);
    }
    for (
      let t = 0;
      t < document.querySelectorAll(".column-shop__button").length;
      t++
    )
      $(".column-shop__button").on("click", function () {
        d(this.id), breake;
      });
  }
  let u = !1;
  function d(t) {
    (document.querySelector(".content-popap-column-quantity__result").value =
      "1"),
      (u = !0);
    let e = document.querySelector(".content-popap-column"),
      o = document.createElement("div");
    o.classList.add("shop__column"),
      o.classList.add("shop-column-popup"),
      o.classList.add("column-shop"),
      e.appendChild(o);
    let s = document.createElement("img");
    o.appendChild(s);
    let i = document.createElement("div");
    i.classList.add("column-shop__body"), o.appendChild(i);
    let n = document.createElement("h3");
    n.classList.add("column-shop__title"), i.appendChild(n);
    let a = document.createElement("div");
    a.classList.add("column-shop__desc"), i.appendChild(a);
    let c = document.createElement("p");
    c.classList.add("column-shop__price"),
      c.classList.add("price-popap"),
      o.appendChild(c),
      Object.keys(p[t]).forEach(function (t) {
        "img" == t && (s.src = this[t]),
          "name" == t && (n.innerText = this[t]),
          "desc" == t && (a.innerText = this[t]),
          "price" == t &&
            ((c.innerText = this[t]),
            (document.querySelector("#content-popap__result-price").innerText =
              this[t]));
      }, p[t]);
  }
  (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    n(),
    document.addEventListener("click", function (t) {
      let e,
        o = t.target,
        s = document.querySelector(".price-popap").innerText;
      if (o.closest(".quantity__button")) {
        let t = parseInt(o.closest(".quantity").querySelector("input").value);
        o.classList.contains("quantity__button_plus")
          ? t++
          : (--t, t < 1 && (t = 1)),
          (o.closest(".quantity").querySelector("input").value = t),
          (e = s * t),
          (document.querySelector("#content-popap__result-price").innerText =
            e);
      }
    }),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const o = e.closest("[data-goto]"),
              s = o.dataset.goto ? o.dataset.goto : "",
              i = !!o.hasAttribute("data-goto-header"),
              n = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
            c(s, i, n), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            o = e.target;
          if ("navigator" === o.dataset.watch) {
            const t = o.id,
              s =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${t}"]`));
            e.isIntersecting
              ? s && s.classList.add("_navigator-active")
              : s && s.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t);
    })(),
    n();
})();


