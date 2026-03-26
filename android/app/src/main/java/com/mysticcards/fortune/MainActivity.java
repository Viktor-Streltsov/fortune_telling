package com.mysticcards.fortune;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Edge-to-edge: web content can use env(safe-area-inset-*) with CSS
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
  }
}
