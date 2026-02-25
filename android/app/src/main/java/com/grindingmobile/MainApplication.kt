package com.grindingmobile

import android.app.Application
import com.chuckerteam.chucker.api.ChuckerInterceptor
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.modules.network.NetworkingModule

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList = PackageList(this).packages
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)

    // Chucker: intercept semua HTTP request dari React Native
    // Muncul sebagai notifikasi, bisa liat request/response detail
    NetworkingModule.setCustomClientBuilder { builder ->
      builder.addInterceptor(ChuckerInterceptor.Builder(this).build())
    }
  }
}
