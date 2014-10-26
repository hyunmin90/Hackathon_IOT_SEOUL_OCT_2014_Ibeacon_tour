package com.junit.bline;

import org.altbeacon.beaconreference.R;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
 
public class p00_introActivity extends Activity {
 
    Handler h;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.p00_intro);
        
        h = new Handler();
        h.postDelayed(irun, 2000);
    }
    Runnable irun = new Runnable(){
    	public void run(){
    		Intent i = new Intent(p00_introActivity.this, p01_MainActivity.class);
    		startActivity(i);
    		finish();
    		
    		overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
    	}
    };
    
    @Override
    public void onBackPressed(){
    	super.onBackPressed();
    	h.removeCallbacks(irun);
    }
}