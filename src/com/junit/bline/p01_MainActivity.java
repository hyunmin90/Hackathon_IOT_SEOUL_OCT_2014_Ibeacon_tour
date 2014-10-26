package com.junit.bline;

import org.altbeacon.beaconreference.R;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.GestureDetector;
import android.view.GestureDetector.SimpleOnGestureListener;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.altbeacon.beaconreference.R.anim;
import org.altbeacon.beaconreference.R.id;
import org.altbeacon.beaconreference.R.layout;

import com.junit.bline.ObservableWebView.OnScrollChangedCallback;
import com.junit.http.defaultHandler;
import com.junit.http.httpCon;

@SuppressLint({ "SetJavaScriptEnabled", "ClickableViewAccessibility" })
public class p01_MainActivity extends Activity implements OnClickListener, defaultHandler {

	static final String TAG = "MainActivity";
	private static final int REQUEST_CONNECT_DEVICE = 1;
	private static final int REQUEST_ENABLE_BT = 2;
	private Button btn_Connect;
	private EditText UUID;
	private BluetoothService btService = null;
	boolean firsttouch = true;
	private ObservableWebView mWebView;
	private RelativeLayout bottomBar;
	private Animation slideup, slidedown;
	
	private static Handler mHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			super.handleMessage(msg);
		}
	};

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.e(TAG, "onCreate");
		
		setContentView(R.layout.p01_main);
		bottomBar = (RelativeLayout)findViewById(R.id.bottom_bar);
		bottomBar.bringToFront();
		bottomBar.setVisibility(View.GONE);
		bottomBar.invalidate();
		
		mWebView = (ObservableWebView) findViewById(R.id.webview);
		
		mWebView.setOnScrollChangedCallback(new OnScrollChangedCallback(){
		    public void onScroll(int l, int t){
		      //Do stuff
		      Log.d(TAG,"We Scrolled etc...");
		    }
		 });
		
		mWebView.setWebViewClient(new WebViewClient() {
			  public void onPageFinished(WebView view, String url) {
			    view.scrollTo(0,0);
			  }
			});
		
		mWebView.setGestureDetector(new GestureDetector(new CustomeGestureDetector()));
		
        mWebView.getSettings().setJavaScriptEnabled(true); 
        mWebView.loadUrl("http://www.google.com");
        mWebView.setWebViewClient(new WebViewClientClass()); 
        
		btn_Connect = (Button) findViewById(R.id.btn_connect);
		btn_Connect.setOnClickListener(this);
		
		// BluetoothService 클래스 생성
		if (btService == null) {
			btService = new BluetoothService(this, mHandler);
		}
		
		slideup = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.slide_from_bottom);
		slidedown = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.slide_to_bottom);
		
		startService(new Intent("android.servcice.MAIN"));
		
		if (isNetworkStat()) {
			Log.i(TAG, "NetworkSate enabled");
			AppStart();
			return;
		}
		else{
			Log.i(TAG, "NetworkSate unabled");
		}
	}
	
	private class CustomeGestureDetector extends SimpleOnGestureListener {      
		private WebView webView;
		@Override
	    public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
			
	        if(e1 == null || e2 == null) return false;
	        if(e1.getPointerCount() > 1 || e2.getPointerCount() > 1) return false;
	        else {
	            try { // right to left swipe .. go to next page
	                if(e1.getX() - e2.getX() > 100 && Math.abs(velocityX) > 800) {
	                	Log.d(TAG,"1");
	                	//do your stuff
	                    return true;
	                } //left to right swipe .. go to prev page
	                else if (e2.getX() - e1.getX() > 100 && Math.abs(velocityX) > 800) {
	                	Log.d(TAG,"2");
	                	//do your stuff
	                	
	                	
	                    return true;
	                } //bottom to top, go to next document
	                else if(e1.getY() - e2.getY() > 100 && Math.abs(velocityY) > 800 
	                        && webView.getScrollY() >= webView.getScale() * (webView.getContentHeight() - webView.getHeight())) {
	                    //do your stuff
	                	Log.d(TAG,"3");
	                	return true;
	                } //top to bottom, go to prev document
	                else if (e2.getY() - e1.getY() > 100 && Math.abs(velocityY) > 800 ) {
	                    //do your stuff
	                	Log.d(TAG,"4");
	                	
	                	return true;
	                } 
	            } catch (Exception e) { // nothing
				}
				return false;
			}
		}

		@Override
		public boolean onScroll(MotionEvent e1, MotionEvent e2,
				float distanceX, float distanceY) {
			//Log.w("TEST", "onScroll / e1 = " + e1.toString());
			//Log.w("TEST", "onScroll / e2 = " + e2.toString());
			
			//mWebView.computeVerticalScrollOffset();
			//if(mWebView.getScrollY() < mWebView.getContentHeight())
			int webViewHeight = mWebView.getContentHeight();
			
			if (e1.getY() - e2.getY() > 20) {
				Log.d(TAG, "up");
				if (bottomBar.getVisibility() != View.GONE) {
					bottomBar.startAnimation(slidedown);
					bottomBar.setVisibility(View.GONE);
				}
			}

			if (e2.getY() - e1.getY() > 20) {
				Log.d(TAG, "down");
				if (bottomBar.getVisibility() != View.VISIBLE) {
					bottomBar.startAnimation(slideup);
					bottomBar.setVisibility(View.VISIBLE);
				}
			}
			
			Log.i("mWebView.getScrollY", mWebView.getScrollY()+"");
			Log.i("mWebView.getContentHeight", mWebView.getContentHeight()+"");
			Log.i("(e1.getX() - e2.getX()", (int)(e2.getRawY() - e1.getRawY())+"");
			Log.i("(int)distanceY", (int)distanceY+"");
			
			//if(mWebView.getScrollY() >= 0 || mWebView.getScrollY() <= mWebView.getContentHeight()){
				mWebView.scrollBy((int)distanceX, (int)distanceY);
				mWebView.invalidate();
			//}
			
			if(mWebView.getScrollY() > webViewHeight+10)
				mWebView.setScrollY(webViewHeight+10);
			
			if(mWebView.getScrollY() < -10)
				mWebView.setScrollY(-10);
			
			return true;
		}
	}

	private class WebViewClientClass extends WebViewClient {
		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			view.loadUrl(url);
			return true;
		}
	}

	protected void AppStart() {
		this.firsttouch = false;
		if (check_activation()) {
			Log.e("MainActivity", "Activated");
			/*
			 * this.mHandler2.postDelayed(new Runnable() { public void run() {
			 * Log.i(TAG, "aa"); // Intent localIntent = new
			 * Intent(MainActivity.this, // MyProfile.class); //
			 * MainActivity.this.startActivity(localIntent); //
			 * MainActivity.this.finish(); } }, 1000L); return;
			 */
		}
		else{
			Log.e("MainActivity", "Not activated");
		}
		
		/*
		this.mHandler2.postDelayed(new Runnable() {
			public void run() {
				// Intent localIntent = new Intent(MainActivity.this,
				// MailActivation.class);
				// MainActivity.this.startActivity(localIntent);
				// MainActivity.this.finish();
			}
		}, 1000L);*/
	}
	
	//sharedPreference로 인증 토큰 저장
	boolean check_activation() {
		SharedPreferences localSharedPreferences = getSharedPreferences("Auth", MODE_PRIVATE);
		String str = localSharedPreferences.getString("token","");
		Log.e(TAG, "Has Token? : " + str);
		boolean nullCheck = str.equals("");
		
		if(nullCheck)
			return false;
		else 
			return true;
	}

	public boolean isNetworkStat() {
		ConnectivityManager localConnectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo mobile = localConnectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
		NetworkInfo wifi = localConnectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
		boolean flag = false;
		
		if (mobile.isConnected() || wifi.isConnected()){
		      Log.d(TAG, "Network connect success");
		      flag = true;
		}else{
			Toast localToast = Toast.makeText(getApplicationContext(),"네트워크 연결 상태를 확인한 후 다시 실행해주세요.", 1);
			localToast.setGravity(17, 0, 0);
			localToast.show();
		}
		return flag;
	}
	
	
	public void ActivityB(View v){
		Intent intent = new Intent(this, p02_signIn.class);
		startActivityForResult(intent, 0);
		overridePendingTransition(R.anim.fade, R.anim.hold);
		//finish();
	}

	@Override
	public void onClick(View v) {
		
		
		int getId = v.getId();
		
		
		if (btService.getDeviceState()) {
			// 블루투스가 지원 가능한 기기일 때
			btService.enableBluetooth();
		} else {
			finish();
		}
		
		
		ActivityB(v);
		
		UUID = (EditText) findViewById(R.id.UUID);
		String uuid = UUID.getText().toString();
		Log.i("uuid 값 : ", uuid);
		
		//sharedPre TEST start
        SharedPreferences pref = getSharedPreferences("Auth", MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();
        editor.putString("token", uuid);
        editor.commit();
        //sharedPre TEST end
        
        //통신 시작
		httpCon<p01_MainActivity> thread = new httpCon<p01_MainActivity>(uuid, p01_MainActivity.this);
		thread.start();
		 
	}
	
	//A에서 B로 갔다가 다시 A로 넘어올 때 사용하는, 안드로이드에서 제공하는 기본 메소드입니다.
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		Log.d(TAG, "comeback " + resultCode);
		setResult(resultCode);
		
		/*		
		switch (requestCode) {

		case REQUEST_ENABLE_BT:
			// When the request to enable Bluetooth returns
			if (resultCode == Activity.RESULT_OK) {
				// 확인 눌렀을 때
			} else {
				// 취소 눌렀을 때
				Log.d(TAG, "Bluetooth is not enabled");
			}
			break;
		}
		*/
	}

	public void handleMessage(Message msg) {
		Log.i("핸들러 성공 : ", "성공");
		/*
		 * String line = (String)msg.obj; String recString =
		 * jsonParserList(line);
		 * 
		 * if(recString!=null&&(recString.equals("11")||recString.equals("00")||
		 * recString.equals("10"))) { AlertDialog.Builder alert = new
		 * AlertDialog.Builder(MainActivity.this);
		 * alert.setTitle("회원정보를 다시 입력해 주세요");
		 * 
		 * if(recString.equals("11"))//이메일 체크 완료 디비 입력 완료 {
		 * alert.setTitle("회원이 되신걸 환영합니다"); alert.setMessage("회원가입완료");
		 * alert.setPositiveButton("확인", new DialogInterface.OnClickListener() {
		 * 
		 * public void onClick(DialogInterface dialog, int id)//다음 화면으로 넘어가기
		 * intent { //Intent it = new Intent(MainActivity.this, 다음화면 클레스
		 * 이름.class); //startActivity(it); } }); } else
		 * if(recString.equals("00"))//이메엘 중복으로 디비 입력 거부 {
		 * alert.setMessage("이메일 중복"); alert.setPositiveButton("확인", null); }
		 * else if(recString.equals("10"))//이메일 체크 통과 하지만 디비 입력 오류 {
		 * alert.setMessage("디비저장오류"); alert.setPositiveButton("확인", null); }
		 * alert.show(); }
		 */
	}

	private String jsonParserList(String recline) {
		try {
			JSONObject json = new JSONObject(recline);// 갖고온 JSON파일을 객체만드는데 사용
			JSONArray jArr = json.getJSONArray("joincheckOK");// jsp파일 안의
																// List배열을 선택
			String line = "";

			for (int i = 0; i < jArr.length(); i++) {
				json = jArr.getJSONObject(i);
				String joinOK = json.getString("joinOK");
				String email = json.getString("emailOK");
				line = email + joinOK;
				Log.d("joincheckOK", line);
			}
			return line;
		} catch (JSONException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	protected void onPause() {
		// TODO Auto-generated method stub
		super.onPause();
		Log.d(TAG,"Now onPause state start");
	}
	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		Log.d(TAG,"ActivityA Dead ");
	}
	@Override
	protected void onRestart() {
		// TODO Auto-generated method stub
		super.onRestart();
		Log.d(TAG," ReStart..");
	}
	@Override
	protected void onStart() {
		// TODO Auto-generated method stub
		super.onStart();
		Log.d(TAG," Start..");
	}
	@Override
	protected void onStop() {
		// TODO Auto-generated method stub
		super.onStop();
		Log.d(TAG," Stop to different task ");
	}
	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
		Log.d(TAG," onResume is run after Start or reStart");
	}
}
