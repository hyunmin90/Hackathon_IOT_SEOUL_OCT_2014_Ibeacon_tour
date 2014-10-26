package org.altbeacon.beaconreference;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.widget.Toast;
 
public class ConnReceiver extends BroadcastReceiver {
	
	static final String TAG = "ConnReceiver";
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
         
        // 네트웍에 변경이 일어났을때 발생하는 부분
        if (action.equals(ConnectivityManager.CONNECTIVITY_ACTION)) {
            ConnectivityManager connectivityManager =
                (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo activeNetInfo = connectivityManager.getActiveNetworkInfo();
            NetworkInfo mobNetInfo = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
            Toast.makeText(context,"Active Network Type : " + activeNetInfo.getTypeName() , Toast.LENGTH_SHORT).show();
            Toast.makeText(context,"Mobile Network Type : " + mobNetInfo.getTypeName() , Toast.LENGTH_SHORT).show();
        }
        
        /*
		if (action.equals(BluetoothAdapter.ACTION_STATE_CHANGED)) {
			final int state = intent.getIntExtra(
					BluetoothAdapter.EXTRA_STATE, BluetoothAdapter.ERROR);
			switch (state) {
			case BluetoothAdapter.STATE_OFF:
				Toast.makeText(context, "블루투스를 끄면 번호표를 못받아여",
						Toast.LENGTH_SHORT).show();
				break;
			// case BluetoothAdapter.STATE_TURNING_OFF:
			// Toast.makeText(context, "Turning Bluetooth off...",
			// Toast.LENGTH_SHORT).show();
			// break;
			case BluetoothAdapter.STATE_ON:
				Toast.makeText(context, "블루투스를 켰어여", Toast.LENGTH_SHORT)
						.show();
				break;
			// case BluetoothAdapter.STATE_TURNING_ON:
			// Toast.makeText(context, "Turning Bluetooth on...",
			// Toast.LENGTH_SHORT).show();
			// break;
			}
		}
		*/
	    if ("android.bluetooth.adapter.action.STATE_CHANGED".equals(intent.getAction()))
	    {
	      if (intent.getIntExtra("android.bluetooth.adapter.extra.STATE", 12) == 10)
	      {
	        Toast localToast = Toast.makeText(context, "bline은 블루투스를 켜야 번호표가 발급되용ㅜㅜ", 1);
	        localToast.setGravity(17, 0, 0);
	        localToast.show();
	      }
	    }
    }
}