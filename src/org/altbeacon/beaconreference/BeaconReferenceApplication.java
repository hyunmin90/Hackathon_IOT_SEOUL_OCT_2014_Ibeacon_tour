package org.altbeacon.beaconreference;

import java.util.Collection;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.Identifier;
import org.altbeacon.beacon.MonitorNotifier;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;
import org.altbeacon.beacon.powersave.BackgroundPowerSaver;
import org.altbeacon.beacon.startup.BootstrapNotifier;
import org.altbeacon.beacon.startup.RegionBootstrap;

import android.app.AlertDialog;
import android.app.Application;
import android.content.Intent;
import android.os.RemoteException;
import android.util.Log;

public class BeaconReferenceApplication extends Application implements BootstrapNotifier, RangeNotifier {
	private static final String TAG = "BeaconReferenceApplication";
	private BeaconManager mBeaconManager;
	private Region mAllBeaconsRegion;
	private MonitoringActivity mMonitoringActivity;
	private RangingActivity mRangingActivity;
	private BackgroundPowerSaver mBackgroundPowerSaver;
	@SuppressWarnings("unused")
	private RegionBootstrap mRegionBootstrap;
	
	@Override 
	public void onCreate() {
		
	
		mAllBeaconsRegion = new Region("com.radiusnetworks.androidproximityreference.backgroundRegion1", Identifier.parse("2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6") , null, null);
		
        mBeaconManager = BeaconManager.getInstanceForApplication(this);
		mBackgroundPowerSaver = new BackgroundPowerSaver(this);		
        mRegionBootstrap = new RegionBootstrap(this, mAllBeaconsRegion);
        mBeaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("m:0-3=4c000215,i:4-19,i:20-21,i:22-23,p:24-24"));
       
        /*Sets the scan rate when its in background.이게 어떤 레이트가 베스트일지는 생각을 좀 해봐야*/
        mBeaconManager.setBackgroundBetweenScanPeriod(10l);
	

	}
	
	@Override
	public void didRangeBeaconsInRegion(Collection<Beacon> arg0, Region arg1) {
		
		
		if (mRangingActivity != null) {
			mRangingActivity.didRangeBeaconsInRegion(arg0, arg1);
		}
		
	}

	@Override
	public void didDetermineStateForRegion(int arg0, Region arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void didEnterRegion(Region arg0) {
		/*여기서 처리하는 코드.만약 비컨이 보인다면, 여기서 이것저것 하면됨 티켓 발급부터 시작해서 */
		Log.i(TAG, "entered region.111112232323232323232  starting ranging");

		
		
		if (mMonitoringActivity != null) {
			mMonitoringActivity.didEnterRegion(arg0);
		}		
		try {
			Log.d(TAG, "entered region.  starting ranging");
			
			Intent intent = new Intent(this,MonitoringActivity.class);
			intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			
			mBeaconManager.startRangingBeaconsInRegion(mAllBeaconsRegion);
			mBeaconManager.setRangeNotifier(this);
			
			//this.startActivity(intent); /*이게 있어야 블루투스 디텍티드돼면 앱실행시*/
			
		} catch (RemoteException e) {
			Log.e(TAG, "Cannot start ranging");
		}
	}

	@Override
	public void didExitRegion(Region arg0) {
		
		Log.i(TAG, "나가버림~~!!!!!!");

		if (mMonitoringActivity != null) {
			mMonitoringActivity.didExitRegion(arg0);
		}				
	}
	
	public void setMonitoringActivity(MonitoringActivity activity) {
		mMonitoringActivity = activity;
	}

	public void setRangingActivity(RangingActivity activity) {
		mRangingActivity = activity;
		
	}
	
	
	
	
}
