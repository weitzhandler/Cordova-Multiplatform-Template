﻿/// <reference path="../imports.ts" />

module App {
    'use strict';

    export class NavigationController {


        public static $inject = [
            '$scope',
            '$ionicHistory',
            '$ionicTabsDelegate'
        ];

        constructor(
            private $scope: INavigationScope,
            private $ionicHistory: Ionic.IHistory,
            private $ionicTabsDelegate: Ionic.ITabsDelegate
            ) {

            document.addEventListener('backbutton', e => this.checkBack(e), false);
            
            // Swipe tabs for Windows Phone
            if (ionic.Platform.isWindowsPhone()){
                this.$scope.onSwipeLeft = () => this.onSwipeLeft();
                this.$scope.onSwipeRight = () => this.onSwipeRight();
            }
        }

        public goBack(): void {
            this.$ionicHistory.goBack();
        }

        public checkBack(e: Event) {
            var page = this.$ionicHistory.currentStateName();
            if (page === 'tabs.home') {
                var nav: any = navigator;
                if (nav.app && nav.app.exitApp) {
                    nav.app.exitApp();
                } else {
                    window.close();
                }
            } else {
                this.goBack();
            }
        }

        public onSwipeLeft() {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex()+1)
        }

        public onSwipeRight() {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() -1)
        }
    }
} 

