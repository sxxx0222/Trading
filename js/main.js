// //darkmode saver
// localStorage.removeItem('colorm');
var colorm = false;
if (localStorage.getItem('colorm')!=null) {
    if (localStorage.getItem('colorm') === 'true' ) {
        colorm = true;
    } else {
        colorm = false;
    }
}

new Vue ({
    el : "#trading-platform",
    data : {
        doneRender : false,
        //reremder modal key
        rerenderKey : 0,

        //color mode
        colormode : colorm,

        //modals checker
        annmodal: false,
        mainmodal: false,
        wlistmodal: false,
        ordmodal : false,
        aposmodal : false,
        cposmodal : false,
        confOrdModal : false,
        clsPosMod : false,
        clsNorMod : false,
        remWatMod : false,
        edtPosMod : false,
        forGridModal : false,

        //ORD TICKET POSITIONAL
        ordTickPosHA : false,
        ordTickPosOU : false,
        posInputs : true,

        //inner main modal content
        imm : [dpw=false, rfr=false, crd=false, 
            prd=false, ovr=false, plr=false,
            uns=false, tra=false, pac=false, 
            set=false, fme=false, tus=false],

        credsChange : false,
        pdetEm : false,
        pdetMo : false,
        viewPlRes : false,
        viewUoRes : false,
        viewTrRes : false,
        //DEPO WITH
        depowithmain : true,
        snew :false,
        depform:false,
        witform:false,
        dreqsub:false,
        wreqsub:false,
        depact : true,
        witact : false,
        deporwit : true,

        //EDIT TAB
        editEurOdds : true,

        //top statistics
        tss : [cre=true, unr=true, mpl=true, mar=true, plo=false, oam=false],
        //if stats are hidden
        statsHide : false,
        //order ticket advanced date
        adCheck : false,
        //order ticket confirm
        confirmedTicket : false,
        goodtillval : false,
        expirydateval: false,
        //close pos order ticket
        confClsPos : false,
        equalOpenClose : 0,
        //close nor order ticket
        confClsNor : false,
        //confirm remove watchlist
        confWatRem : false,
        //confirm actulize
        confirmAct : false,
        //edit pos order ticket
        confEdt : false,
        //ALERTS
        pdetemail : false,
        pdetmobil : false,
        prefalert : false,
        dmessage : false,
        wmessage : false
    },
    created () {this.doneRender = true;},
    methods : {
        plFilter : function() {
            this.viewPlRes = true;            
            if ($('.pl-result-cont').find('.overflow-wrap').height() > $(".pl-result-cont").height()) {
                $(".pl-result-cont").prev().addClass('overflowed');
            }

        },
        trFilter : function() {
            this.viewPlRes = true;            
            if ($('.tr-result-cont').find('.overflow-wrap').height() > $(".tr-result-cont").height()) {
                $(".tr-result-cont").prev().addClass('overflowed');
            }

        },
        staSelUp : function(e) {
            var options = $(e).closest('.select-buttons').prev('select').children();
            var dex = null;

            $(options).each(function(){if($(this).prop('selected') === true) {dex=$(this)}});

            if ($(dex).index() > 0) {
                $(options).closest('select').val($(options[$(dex).index()-1]).val());
            }
        },
        staSelDo : function(e) {
            var options = $(e).closest('.select-buttons').prev('select').children();
            var dex = null;
            $(options).each(function(){if($(this).prop('selected') === true) {dex=$(this)}});
        
            if ($(dex).index() < options.length-1) {
                $(options).closest('select').val($(options[$(dex).index()+1]).val());
            }
        },
        opnOrdWin : function(e) {
            if (this.ordmodal === false) this.ordmodal = true;
            var ordwins = $(".order-ticket .inner-cont").not('active');
            //check if window still available
            if (ordwins.length <= 0) {
                //full; open limit window
            } else {
                $(ordwins[0]).addClass('active');
            }
        },
        clsOrdWin : function(e) {
            if ($(".inner-cont.active").length < 2) {
                //close whole order ticket section
                this.ordmodal = false;
            } else {
                $(e).closest('.inner-cont').removeClass('active');
            }
        },
        closeCond : function(e) {
            $(e).closest('.closing-conditions').toggleClass('active');
        },
        saveColor : function() {
            colorm = !colorm;
            localStorage.setItem('colorm', colorm);
        },
        checkDepWit : function() {
            //if(this.depact){this.depform = true} else if(this.witact){this.witform = true}
            if(this.deporwit === true){this.depform = true} else if(this.deporwit === false){this.witform = true}
        },
        resetPos : function(e) {
            $(e).closest(".inner-cont").css("left", "0");
            $(e).closest(".inner-cont").css("top", "0");
            //resets active inner main modal content
            for(var i = 0; i < this.imm.length; i++) {
                this.imm[i] = false;
            }
            //resets ordtick
            // if($(".order-ticket .inner-cont").hasClass("lg")){
            //     $(".order-ticket .inner-cont").removeClass("lg");
            // }
            $("#fut-ord").removeClass("active");
            $("#fut-ord-content").removeClass("active");
            $("#cur-ord").addClass("active");
            $("#cur-ord-content").addClass("active");
            //remove advance dates normal / positional radios
            this.adCheck = false;
            //removes error messages
            $(".error-message").removeClass("show");
            //closing conditions bottom
            $('.closing-conditions .bottom-cont').removeClass('active');
            //confirm ticket reset
            this.confirmedTicket = false;
            this.goodtillval = false;
            this.expirydateval = false;
            //confirm actulize
            this.confirmAct = false;
            //depo with reset
            this.depowithmain = true;
            this.snew = false;
            this.depform=false;
            this.witform=false,
            this.dreqsub=false;
            this.wreqsub=false;
            this.deporwit = true;
            this.dmessage=false;
            this.wmessage=false;
            //order ticket radios reset
            this.ordTickPosHA = false;
            this.ordTickPosOU = false;
            //confirm order ticket reset
            this.confClsNor = false;
            this.confClsPos = false;
            this.confWatRem = false;
        },
        resetBack : function() {
            $(e).closest(".inner-cont").css("left", "0");
            $(e).closest(".inner-cont").css("top", "0");
            //resets active inner main modal content
            for(var i = 0; i < this.imm.length; i++) {
                this.imm[i] = false;
            }
            //resets ordtick
            if($(".order-ticket .inner-cont").hasClass("lg")){
                $(".order-ticket .inner-cont").removeClass("lg");
            }
            $("#fut-ord").removeClass("active");
            $("#fut-ord-content").removeClass("active");
            $("#cur-ord").addClass("active");
            $("#cur-ord-content").addClass("active");
            //removes error messages
            $(".error-message").removeClass("show");
            //closing conditions bottom
            $('.closing-conditions .bottom-cont').removeClass('active');
            //confirm ticket reset
            this.confirmedTicket = false;
            this.goodtillval = false;
            this.expirydateval = false;
            //confirm actulize
            this.confirmAct = false;
            //depo with reset
            this.depowithmain = true;
            this.snew = false;
            this.depform=false;
            this.witform=false,
            this.dreqsub=false;
            this.wreqsub=false;
            this.deporwit = true;
            this.dmessage=false;
            this.wmessage=false;
            //order ticket radios reset
            this.ordTickPosHA = false;
            this.ordTickPosOU = false;
            //confirm order ticket reset
            this.confClsNor = false;
            this.confClsPos = false;
            this.confWatRem = false;
        },
        resetDepoWith : function() {
            //depo with reset
            this.depowithmain = true;
            this.snew = false;
            this.depform=false;
            this.witform=false,
            this.dreqsub=false;
            this.wreqsub=false;
            this.deporwit = true;
            this.dmessage=false;
            this.wmessage=false;
        },
        resetInner : function(n) {
            //resets active inner main modal content
            for(var i = 0; i < this.imm.length; i++) {
                this.imm[i] = false;
            }
            //change active
            this.imm[n] = true;

            //rerender key to rerender element
            ++this.rerenderKey;
        },
        checkDepoAm : function(){
            if($("#deposit-amount").val() == "") {
                this.dmessage = true;
            } else {
                this.depform = false;
                this.dreqsub = true;
            }
        },
        checkWithAm : function(){
            if($("#withdraw-amount").val() == "") {
                this.wmessage = true;
            } else {
                this.witform = false;
                this.wreqsub = true;
            }
        },
        spbookCheck :function(){
            checkAll();
        },
        spbookUnCheck :function(){
            unCheckAll();
        },
        leftnavDrop : function(ind) {
            $(".left-accord .outer li:nth-child("+ind+") .inner").slideDown(200);
            $(".left-accord .outer li:nth-child("+ind+") .inner").toggleClass("active");
        },
        resetAccords : function() {
            resetAccordion();
        },
        toggleDdown : function() {        
            $(".mcount-ddown ul").toggleClass("active");
        },
        //reset alerts
        resetAlerts : function() {
            this.prefalert = false;
            this.pdetmobil = false;
            this.pdetemail = false;
        }
    }
});

//DRAG RESIZE
$(document).ready(function() {

    $(".table-orders").customResize({
        handleSelector: "#draggable",
        resizeWidth: false,
        fEl : $('.table-games'),
        sEl : $('.gms-nav'),
        tEl : $('header')
    });
});

//CHECKBOXES
$(".left-check input").on("change",function(){
    if($(this).closest(".left-check").next().hasClass("active")){
        $(this).closest(".left-check").next().slideUp(200);
    }else {
        $(this).closest(".left-check").next().slideDown(200);
    }
    $(this).closest(".left-check").next().toggleClass("active");
});

//MINIMIZE STATS CLOSE STATS
$("#minimize-stats").click(function() {
    if($(".show-hide-stats").hasClass("active")) {
        $(".show-hide-stats").removeClass("active");
    }
});

//WLIST MODAL FILTER
var filterq = false;
$(window).click(function(){
    if(filterq) {
        $(".filter-cont").removeClass("active");
        filterq = false;
    }
    if($(".show-hide-stats").hasClass("active")) {
        $(".show-hide-stats").toggleClass("active")
    }
    if($(".mcount-ddown ul").hasClass("active")) {
        $(".mcount-ddown ul").toggleClass("active");
    }
    if($(".country-ddown ul").hasClass("active")) {
        $(".country-ddown ul").toggleClass("active");
    }
    if($(".wlist-drop").hasClass("active")) {
        $(".wlist-drop").toggleClass("active");
    }
});

$(".top-stats").click(function(e){
    e.stopPropagation();
});

$(".mcount-ddown").click(function(e){
    e.stopPropagation();
});

$(".country-ddown").click(function(e) {
    e.stopPropagation();
});

$(".wlist-drop-cont").click(function(e) {
    e.stopPropagation();
});

$(".search").click(function(e){
    e.stopPropagation();
});

$(".filter-cont").click(function(event){
    event.stopPropagation();    
    if(!filterq) {
        $(this).addClass("active");
        filterq = true;
    }
});

$(".wlist-filter-drop li").click(function(){
    $("#wlist-filter").val($(this).text());
});

$(".filter-cont .clear-button").click(function(){
    $("#wlist-filter").val("");
})

//MAIN MODAL ACCORDION
$(".left-accord .outer li h3").click(function(){
    var inner = $(this).next(".inner");
    if ($(inner).hasClass("active")){
        $(inner).slideUp(200);
    } else {$(inner).slideDown(200)}
    $(inner).toggleClass("active");
});
var click = {
    x: 0,
    y: 0
};

//MODAL DRAGGING
$(".main-modal .inner-cont").draggable({
    handle : ".top",
    containment : ".main-modal",
});
$(".ann-modal .inner-cont").draggable({
    handle : ".top",
    containment : ".ann-modal"
});
$(".addwlist-modal .inner-cont").draggable({
    handle : ".top",
    containment : ".addwlist-modal"
});
$(".order-ticket .inner-cont").draggable({
    handle : ".top",
    containment : "#trading-platform"
});
$(".confirm-ticket .inner-cont").draggable({
    handle : ".top",
    containment : ".confirm-ticket"
});
$(".edit-positional-order-ticket .inner-cont").draggable({
    handle : ".top",
    containment : ".edit-positional-order-ticket"
});
$(".close-positional-order-ticket .inner-cont").draggable({
    handle : ".top",
    containment : ".close-positional-order-ticket"
});
$(".forecast-grid .inner-cont").draggable({
    handle : ".top",
    containment : ".forecast-grid"
});
$(".actualize-position .inner-cont").draggable({
    handle : ".top",
    containment : ".actualize-position"
});
$(".close-positional .inner-cont").draggable({
    handle : ".top",
    containment : ".close-positional"
});
$(".close-normal-order-ticket .inner-cont ").draggable({
    handle : ".top",
    containment : ".close-normal-order-ticket"
});


var click = {
    x: 0,
    y: 0
};
var zoom = 0.8;
if($(window).width() <= 651) {
    console.log($(window).width());
    //MODAL DRAGGING SCALE FIX
    $(".main-modal .inner-cont").draggable({
        handle : ".top",
        containment : ".main-modal",

        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".ann-modal .inner-cont").draggable({
        handle : ".top",
        containment : ".ann-modal",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".addwlist-modal .inner-cont").draggable({
        handle : ".top",
        containment : ".addwlist-modal",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".order-ticket .inner-cont").draggable({
        handle : ".top",
        containment : "#trading-platform",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".confirm-ticket .inner-cont").draggable({
        handle : ".top",
        containment : ".confirm-ticket",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".edit-positional-order-ticket .inner-cont").draggable({
        handle : ".top",
        containment : ".edit-positional-order-ticket",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".close-positional-order-ticket .inner-cont").draggable({
        handle : ".top",
        containment : ".close-positional-order-ticket",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".forecast-grid .inner-cont").draggable({
        handle : ".top",
        containment : ".forecast-grid",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".actualize-position .inner-cont").draggable({
        handle : ".top",
        containment : ".actualize-position",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".close-positional .inner-cont").draggable({
        handle : ".top",
        containment : ".close-positional",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
    $(".close-normal-order-ticket .inner-cont ").draggable({
        handle : ".top",
        containment : ".close-normal-order-ticket",
        
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / zoom,
                top:  (event.clientY - click.y + original.top ) / zoom
            };

        }
    });
}

//ORDER TABLE DOCKING SIZES
$("#sdock").click(function(){
    console.log($('#draggable'));
    if (!($(".table-orders").hasClass("sm"))){

        $(".table-orders").removeClass("min");$(".table-games").removeClass("full");
        $(".table-orders").removeClass("lg");$(".table-games").removeClass("sm");
        $(".table-orders").removeClass("md");$(".table-games").removeClass("md");
        $(".table-orders").addClass("sm");$(".table-games").addClass("lg");
        
    }
    var toSubtract = $(".table-orders").height() + $(".gms-nav").height() + $('header').height();
    $('.table-games').css('height', 'calc(100% - '+ toSubtract  +'px)');
});
$("#mdock").click(function(){
    if (!($(".table-orders").hasClass("md"))){
        $(".table-orders").removeClass("min");$(".table-games").removeClass("full");
        $(".table-orders").removeClass("lg");$(".table-games").removeClass("lg");
        $(".table-orders").removeClass("sm");$(".table-games").removeClass("sm");
        $(".table-orders").addClass("md");$(".table-games").addClass("md");
        
    }
    var toSubtract = $(".table-orders").height() + $(".gms-nav").height() + $('header').height();
    $('.table-games').css('height', 'calc(100% - '+ toSubtract  +'px)');
});
$("#ldock").click(function(){
    if (!($(".table-orders").hasClass("lg"))){
        $(".table-orders").removeClass("min");$(".table-games").removeClass("full");
        $(".table-orders").removeClass("sm");$(".table-games").removeClass("lg");
        $(".table-orders").removeClass("md");$(".table-games").removeClass("md");
        $(".table-orders").addClass("lg");$(".table-games").addClass("sm");

    }
    var toSubtract = $(".table-orders").height() + $(".gms-nav").height() + $('header').height();
    $('.table-games').css('height', 'calc(100% - '+ toSubtract  +'px)');
});

$(window).resize(function() {
    var toSubtract = $(".table-orders").height() + $(".gms-nav").height() + $('header').height();
    $('.table-games').css('height', 'calc(100% - '+ toSubtract  +'px)');
});
$(window).on("orientationchange",function() {
    var toSubtract = $(".table-orders").height() + $(".gms-nav").height() + $('header').height();
    $('.table-games').css('height', 'calc(100% - '+ toSubtract  +'px)');
});

//TOP STATS
$(".top-stats .stats").click(function(){
    $(".top-stats .show-hide-stats").toggleClass("active");
    $(".mcount-ddown ul").removeClass("active");
    $(".country-ddown ul").removeClass("active");
    $(".wlist-drop").removeClass("active");
    $(".search").removeClass("active");
});

//MY ACCOUNT DROPDOWN
$(".mcount-ddown .top").click(function(){
    var el = $(this).closest(".mcount-ddown").find("ul");
    $(el).toggleClass("active");
    $(".show-hide-stats").removeClass("active");
    $(".country-ddown ul").removeClass("active");
    $(".wlist-drop").removeClass("active");
    $(".search").removeClass("active");
});

//WLIST DROPDOWN
$(".wlist-drop-cont h2").click(function(){
    var el = $(this).closest(".wlist-drop-cont").find(".wlist-drop");
    $(el).toggleClass("active");
    $(".mcount-ddown ul").removeClass("active");
    $(".show-hide-stats").removeClass("active");
    $(".country-ddown ul").removeClass("active");
    $(".search").removeClass("active");
});

//COUNTRY DROPDOWN
$(".country-ddown").click(function(){
    var el = $(this).closest(".country-ddown").find("ul");
    $(el).toggleClass("active");
    $(".mcount-ddown ul").removeClass("active");
    $(".show-hide-stats").removeClass("active");
    $(".wlist-drop").removeClass("active");
    $(".search").removeClass("active");
});

//SEARCH DROPDOWN
$("#search-match-league").focus(function(){
    $(".wlist-drop").removeClass("active");
    $(".mcount-ddown ul").removeClass("active");
    $(".show-hide-stats").removeClass("active");
    $(".country-ddown ul").removeClass("active");
    $(this).closest(".search").addClass("active");
});
$(document).click(function(){
    $(".search").removeClass("active");
    $(".search-ml-dropdown .results").removeClass("hide");
    $(".search-ml-dropdown .add-selected-item").removeClass("active");
});

$(".search-item.match-result").click(function(){
    $(".search-ml-dropdown .results").addClass("hide");
    $(".search-ml-dropdown .add-selected-item").addClass("active");
    $(".add-selected-item .selected-name").text($(this).find(".name").text());
});
$(".search-item.league-result").click(function(){
    $(".search-ml-dropdown .results").addClass("hide");
    $(".search-ml-dropdown .add-selected-item").addClass("active");
    $(".add-selected-item .selected-name").text($(this).find(".name").text());
});
$(".search-back").click(function(){
    $(".search-ml-dropdown").removeClass("active");
    $(".search-ml-dropdown .results").removeClass("hide");
    $(".search-ml-dropdown .add-selected-item").removeClass("active");
});
$(".search-add").click(function(){
    $(".search-ml-dropdown").removeClass("active");
    $(".search-ml-dropdown .results").removeClass("hide");
    $(".search-ml-dropdown .add-selected-item").removeClass("active");
});

//MORE INFO / STATE DROPDOWN
$(".more-info").click(function(){
    if(!($(this).next().hasClass('active'))) {
        $(this).closest('.gms-items').addClass('minfo-active');
        $(this).next().slideDown(300);
        $(this).next().addClass("active");

    } else {
        $(this).closest('.gms-items').removeClass('minfo-active');
        $(".more-info-drop.active").removeClass("active");
        $(this).next().slideUp(200);
    }
});

//SETTINGS
//spbook check uncheck
function checkAll(){
    for(var i = 0; i < $(".spbook-check-list li input:checkbox").length; i++) {
        if(!($($(".spbook-check-list li input:checkbox")[i]).prop('checked'))) {
            $($(".spbook-check-list li input:checkbox")[i]).prop('checked', true);
        }
    }
}
function unCheckAll(){
    for(var i = 0; i < $(".spbook-check-list li input:checkbox").length; i++) {
        if($($(".spbook-check-list li input:checkbox")[i]).prop('checked')) {
            $($(".spbook-check-list li input:checkbox")[i]).prop('checked', false);
        }
    }
}

//SPORT TABS CHANGE CONTENT BELOW
//soccer
const sportTabs = $(".sport-cat-tabs ul li");
const sportTable = $(".table-games");
const sportTitles = $(".games-titles");
const sportFilters = $(".flt-tabs");
const timeTitles = $(".time-titles");

$(sportTabs).click(function(){
    for(var i = 0; i < sportTabs.length; i++){
        $(sportTabs[i]).removeClass("active");
        $(sportTable[i]).removeClass("active");
    }
    $(sportTitles).removeClass("active");
    $(sportFilters).removeClass("active");
    $(this).addClass("active");
    $(sportTable[$(this).index()]).addClass("active");
    
    if($(this).index() == 0) {
        $(".soccer-titles").addClass('active');
        $(timeTitles).removeClass('active');
        $(timeTitles[$(".soccer-filter-tabs li.active").index()]).addClass("active");
    } else if ($(this).index() == 1) {
        $(".tennis-titles").addClass('active');
        $(timeTitles).removeClass('active');
        $(timeTitles[$(".tennis-filter-tabs li.active").index()]).addClass("active");
    } else if ($(this).index() == 2) {
        $(".basket-titles").addClass('active');
        $(timeTitles).removeClass('active');
        $(timeTitles[$(".basket-filter-tabs li.active").index()]).addClass("active");
    }

    $(sportFilters[$(this).index()]).addClass("active");
});

//SPORT FILTER TABS
//soccer
const socFilterTabs = $(".filter-tabs ul.soccer-filter-tabs li");
const socDateTabs = $("#soccer-games .date-tabs");

$(socFilterTabs).click(function(){
    $(socFilterTabs).removeClass("active");
    $(this).addClass("active");
    $(socDateTabs).removeClass("active");
    $(timeTitles).removeClass('active');
    $(socDateTabs[$(socFilterTabs).index($(this))]).addClass("active");
    $(timeTitles[$(socFilterTabs).index($(this))]).addClass("active");
});
//tennis
const tenFilterTabs = $(".filter-tabs ul.tennis-filter-tabs li");
const tenDateTabs = $("#tennis-games .date-tabs");
$(tenFilterTabs).click(function(){
    $(tenFilterTabs).removeClass("active");
    $(this).addClass("active");
    $(tenDateTabs).removeClass("active");
    $(timeTitles).removeClass("active");
    $(tenDateTabs[$(tenFilterTabs).index($(this))]).addClass("active");
    $(timeTitles[$(tenFilterTabs).index($(this))]).addClass("active");
});
//basket
const basFilterTabs = $(".filter-tabs ul.basket-filter-tabs li");
const basDateTabs = $("#basket-games .date-tabs");
$(basFilterTabs).click(function(){
    $(basFilterTabs).removeClass("active");
    $(this).addClass("active");
    $(basDateTabs).removeClass("active");
    $(timeTitles).removeClass("active");
    $(basDateTabs[$(basFilterTabs).index($(this))]).addClass("active");
    $(timeTitles[$(basFilterTabs).index($(this))]).addClass("active");
});

//ORDERS TABS
const orderTabs = $(".ordrs-tabs li");
const orderTables = $(".order-table");
$(orderTabs).click(function(){
    for(var i = 0; i < orderTabs.length; i++){
        $(orderTabs[i]).removeClass("active");
        $(orderTables[i]).removeClass("active");
    }
    $(orderTables[$(orderTabs).index($(this))]).addClass("active");
    $(this).addClass("active");
});

function resetAccordion () {
    for(var i = 0; i < $(".left-accord .outer li .inner").length; i++) {
        var inners = $(".left-accord .outer li .inner");
        if($(inners[i]).hasClass("active")) {
            $(inners[i]).hide();
            $(inners[i]).toggleClass("active");
        }
    }
    //resets deposit withdraw
    $("#depowith .cont").removeClass("show");
    $("#depowith .main-depo-with").addClass("show");
}


//MINIMIZE TABLE ORDERS
$(".orders-ddown").click(function(){
    if ($('.table-orders').height() > 62) {
        $(".table-games").toggleClass("full");
        $(".table-orders").toggleClass("min");
        //minimizeQue = !minimizeQue;
        var toSubtract = $(".table-orders").height() + $(".gms-nav").height() + $('header').height();
        $('.table-games').css('height', 'calc(100% - '+ toSubtract  +'px)');
    }
});

//TABLE ORDERS MAX DRAG
$(document).ready(function() {
    var toSubtract = $(".gms-nav").height() + $('header').height();
$('.table-orders').css('max-height', 'calc(100% - '+ toSubtract  +'px)')
})

//SHOW HIDE TABLE GAMES STATS
$(".btns .plus").click(function(){
    if(!($(this).closest(".tgames-row").hasClass("show-stats"))) {
        $(this).closest(".tgames-row").find(".stats").slideDown(200);
        $(this).closest(".tgames-row").addClass("show-stats");
    }
});
$(".btns .minus").click(function(){
    if($(this).closest(".tgames-row").hasClass("show-stats")) {
        $(this).closest(".tgames-row").find(".stats").slideUp(200);
        $(this).closest(".tgames-row").removeClass("show-stats");
    }
});
$(".dtime").click(function() {
    if(!($(this).closest(".tgames-row").hasClass("show-stats"))) {
        $(this).closest(".tgames-row").find(".stats").slideDown(200);
        $(this).closest(".tgames-row").addClass("show-stats");
    } else {
        $(this).closest(".tgames-row").find(".stats").slideUp(200);
        $(this).closest(".tgames-row").removeClass("show-stats");
    }
});
$(".ord-ticket-click-wrapper .match").click(function() {
    if(!($(this).closest(".tgames-row").hasClass("show-stats"))) {
        $(this).closest(".tgames-row").find(".stats").slideDown(200);
        $(this).closest(".tgames-row").addClass("show-stats");
    } else {
        $(this).closest(".tgames-row").find(".stats").slideUp(200);
        $(this).closest(".tgames-row").removeClass("show-stats");
    }
});

//TABLE GAMES ITEM STAR
$(".btns .star").click(function(){
    if($(this).hasClass("active")) {
        $(this).find("img").attr("src", "images/bstar-item.png");
    } else {
        $(this).find("img").attr("src", "images/bstar-item-fill.png");
    }
    $(this).toggleClass("active");
});

//DATEPICKERS
$("#start-time-from").datepicker();
$("#start-time-to").datepicker();

//filter by match time
$("#filter-by-match-time").click(function(){
    $("#match-time-dates-filter").toggleClass("active");
    $(".market-select").toggleClass("active");
});

//orders click
$("#jbms-rad").click(function(){
   if (!($(".when-order-expires").hasClass("active"))) {
       $(".when-order-expires").addClass("active");
   }
});
$("#custom-rad").click(function(){
   if (!($(".when-order-expires").hasClass("active"))) {
       $(".when-order-expires").addClass("active");
   }
});
$("#cancel-rad").click(function(){
   if ($(".when-order-expires").hasClass("active")) {
       $(".when-order-expires").removeClass("active");
   }
});

$("#cur-ord").click(function(){
    if(!($(this).hasClass("active"))){
        $("#fut-ord").removeClass("active");
        $("#fut-ord-content").removeClass("active");
        $(this).addClass("active");
        $("#cur-ord-content").addClass("active");
    }
});
$("#fut-ord").click(function(){
    if(!($(this).hasClass("active"))){
        $("#cur-ord").removeClass("active");
        $("#cur-ord-content").removeClass("active");
        $(this).addClass("active");
        $("#fut-ord-content").addClass("active");
    }
});

//close positional order
$("#cpos-tab").click(function(){
    if(!($(this).hasClass("active"))){
        $("#edit-tab").removeClass("active");
        $("#edit-content").removeClass("active");
        $(this).addClass("active");
        $("#cpos-content").addClass("active");
    }
});
$("#edit-tab").click(function(){
    if(!($(this).hasClass("active"))){
        $("#cpos-tab").removeClass("active");
        $("#cpos-content").removeClass("active");
        $(this).addClass("active");
        $("#edit-content").addClass("active");
    }
});

$(".ot-select").click(function(){
    if(!($(this).hasClass("focused"))) {
        $(this).closest('.outer-wrapper').find('.ot-select').removeClass("focused");
        $(this).addClass("focused");
    }
});

//close positional order
$(".cpos-select").click(function(){
    if(!($(this).hasClass("focused"))) {
        $(this).closest('.cpos-ou-wrap').find('.cpos-select').removeClass("focused");
        $(this).addClass("focused");
    }
});

//GAME ITEMS ORDER SELECTOR
$(".ha-home-sel").click(function(){
    $(".order-ticket .inner-cont").removeClass("lg");
    $(".outer-wrapper").removeClass("active");
    $(".home-away").addClass("active");
    if(!($(".ha-home").hasClass("focused"))) {
        $(".ot-select").removeClass("focused");
        $(".ha-home").addClass("focused");
    }
});
$(".ha-away-sel").click(function(){
    $(".order-ticket .inner-cont").removeClass("lg");
    $(".outer-wrapper").removeClass("active");
    $(".home-away").addClass("active");
    if(!($("#ha-away").hasClass("focused"))) {
        $(".ot-select").removeClass("focused");
        $(".ha-away").addClass("focused");
    }
});
$(".ou-over-sel").click(function(){
    $(".order-ticket .inner-cont").removeClass("lg");
    $(".outer-wrapper").removeClass("active");
    $(".over-under").addClass("active");
    if(!($(".ou-over").hasClass("focused"))) {
        $(".ot-select").removeClass("focused");
        $(".ou-over").addClass("focused");
    }
});
$(".ou-under-sel").click(function(){
    $(".order-ticket .inner-cont").removeClass("lg");
    $(".outer-wrapper").removeClass("active");
    $(".over-under").addClass("active");
    if(!($(".ou-under").hasClass("focused"))) {
        $(".ot-select").removeClass("focused");
        $(".ou-under").addClass("focused");
    }
});
$(".hda-home-sel").click(function(){
    $(".order-ticket .inner-cont").addClass("lg");
    $(".outer-wrapper").removeClass("active");
    $(".home-draw-away").addClass("active");
    if(!($(".hda-home").hasClass("focused"))) {
        $(".ot-select").removeClass("focused");
        $(".hda-home").addClass("focused");
    }
});
$(".hda-draw-sel").click(function(){
    $(".order-ticket .inner-cont").addClass("lg");
    $(".outer-wrapper").removeClass("active");
    $(".home-draw-away").addClass("active");
    if(!($(".hda-draw").hasClass("focused"))) {
        $(".ot-select").removeClass("focused");
        $(".hda-draw").addClass("focused");
    }
});
$(".hda-away-sel").click(function(){
    $(".order-ticket .inner-cont").addClass("lg");
    $(".outer-wrapper").removeClass("active");
    $(".home-draw-away").addClass("active");
    if(!($(".hda-away").hasClass("focused"))) {
        $(".ot-select").removeClass("focused");
        $(".hda-away").addClass("focused");
    }
});

//WATCHLIST CHECK ALL UNCHECK ALL
$("#check-all-wlist").click(function(){
    var checkboxes = $(".checkbox-row input[type='checkbox']");
    for(var i=0; i < checkboxes.length; i++) {
        $(checkboxes[i]).prop("checked", true);
    }
    $(".right-check").slideDown(200);
    $(".right-check").addClass("active");
});
$("#uncheck-all-wlist").click(function(){
    var checkboxes = $(".checkbox-row input[type='checkbox']");
    for(var i=0; i < checkboxes.length; i++) {
        $(checkboxes[i]).prop("checked", false);
    }
    $(".right-check").slideUp(200);
    $(".right-check").removeClass("active");
});

$("#goverment-id-file").on("change", function(){
    var path = $(this).val();
    var npath = path.replace("C:\\fakepath\\", "");
    if(npath == "") {
        npath = "Choose file...";
        $(this).next().find("p").text(npath);
    } else {
        $(this).next().find("p").text(npath);
    }
});
$("#proof-add-file").on("change", function(){
    var path = $(this).val();
    var npath = path.replace("C:\\fakepath\\", "");
    if(npath == "") {
        npath = "Choose file...";
        $(this).next().find("p").text(npath);
    } else {
        $(this).next().find("p").text(npath);
    }
});


//override depowith radio
$("#depo-form-rad").prop('checked',true);


//STANDARD SELECT UP AND DOWN
$(".select-buttons .up").click(function(){
    var options = $(this).closest('.select-buttons').prev('select').children();
    var dex = null;
    $(options).each(function(){if($(this).prop('selected') === true) {dex=$(this)}});

    if ($(dex).index() > 0) {
        $(options).closest('select').val($(options[$(dex).index()-1]).val());
    }
});
$(".select-buttons .down").click(function(){
    var options = $(this).closest('.select-buttons').prev('select').children();
    var dex = null;
    $(options).each(function(){if($(this).prop('selected') === true) {dex=$(this)}});

    if ($(dex).index() < options.length-1) {
        $(options).closest('select').val($(options[$(dex).index()+1]).val());
    }
});

//live date
if($('.bottom-timezone')) {
    setInterval(function() {
    runDate();
    }, 1000);
}

function runDate() {
    var date = new Date();
    var splitGmt = date.toString().split(" ");

    const dateEl = $("#curr-date");
    const timeEl = $("#curr-time");
    const tzonEl = $("#time-zone");
    $(dateEl).text(date.getFullYear() +"-"+date.getMonth()+"-"+date.getDate());
    $(timeEl).text(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
    $(tzonEl).text(splitGmt[5]);
}

//closing conditions top dropdown
$(".closing-conditions .top-dropdown p").click(function(){
    $(this).closest('.closing-conditions .bottom-cont').toggleClass('active');
});

//darkmode for other pages 
if ($(".other-pages")!=null) {
    if (colorm === true) {
        $(".other-pages").addClass('dark');
    }
}

$(".other-pages.dark").closest('body').addClass('dark-bdy');


$(document).ready(function(){
    //BET LIST PAGE
    $("#bet-start-filter").datepicker();
    $("#bet-end-filter").datepicker();
    $(".filter input").focus(function(){
        $(this).next('.result-dropdown').addClass("active");
    });
    $(document).click(function(){
        if($(".result-dropdown").hasClass("active")){
            $(".result-dropdown").removeClass("active");
        }
    });
    $(".filter").click(function(e){
        e.stopPropagation();
    });
    $(".result-dropdown li").click(function(){
        $(this).closest("ul").prev().val($(this).find('p').text());
        $(this).closest('ul').removeClass("active");
    });
    $(".clear-field").click(function(){
        $(this).next().val("");
    });
});

//markets dropdown select
$(".mrkt-drop li").click(function(){
    $(".mrkt-drop-cont>h3").text($(this).text());
    $(".mrkt-drop-cont").addClass('selected');
});

$(document).ready(function() {
    
    //check if overflow
    if ($('.pl-result-cont .overflow-wrap').children().length > 1) {
    }
});

//order ticket remove lg
$(".order-ticket .clsbtn").click(function(){
    if ($(this).closest('.inner-cont').hasClass('lg')) {
        $(this).closest('.inner-cont').removeClass('lg');
    }
});
// $(window).click(function(){
//     if ($('.order-ticket .inner-cont.lg').hasClass('lg')) {
//         $('.order-ticket .inner-cont.lg').removeClass('lg');
//     }
// });
// $(".order-ticket .inner-cont").click(function(e){
//     e.stopPropagation();
// });
// $(".ord-ticket-click-wrapper li").click(function(e){
//     e.stopPropagation();
// });