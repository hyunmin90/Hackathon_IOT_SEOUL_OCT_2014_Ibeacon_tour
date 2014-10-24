package com.junit.bline;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.junit.bline.R;
import com.junit.http.defaultHandler;
import com.junit.http.httpCon;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends Activity implements OnClickListener, defaultHandler {
	
	// Debugging
	private static final String TAG = "Main";
	// Intent request code
	private static final int REQUEST_CONNECT_DEVICE = 1;
	private static final int REQUEST_ENABLE_BT = 2;
	
	// Layout
	private Button btn_Connect;
	private TextView txt_Result;
	private EditText UUID;
	private BluetoothService btService = null;
	
	
	private final Handler mHandler = new Handler() {

		@Override
		public void handleMessage(Message msg) {
			super.handleMessage(msg);
		}
		
	};

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.e(TAG, "onCreate");
		
		setContentView(R.layout.activity_main);
		
		/** Main Layout **/
		btn_Connect = (Button) findViewById(R.id.btn_connect);
		txt_Result = (TextView) findViewById(R.id.txt_result);
		
		btn_Connect.setOnClickListener(this);
		
		 // BluetoothService 클래스 생성
		if(btService == null) {
			btService = new BluetoothService(this, mHandler);
		}
	}

	@Override
	public void onClick(View v) {
		if(btService.getDeviceState()) {
			// 블루투스가 지원 가능한 기기일 때
			btService.enableBluetooth();
		} else {
			finish();
		}
		
		UUID = (EditText)findViewById(R.id.UUID);
		String uuid = UUID.getText().toString();
		Log.i("uuid 값 : ", uuid);
		
		httpCon<MainActivity> thread = new httpCon<MainActivity>(uuid, MainActivity.this);
		thread.start();
	}
	
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.d(TAG, "onActivityResult " + resultCode);
        
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
	}
	
	public void handleMessage(Message msg)
	{
		Log.i("핸들러 성공 : ","성공");
		/*
		String line = (String)msg.obj;
		String recString = jsonParserList(line);
		
		if(recString!=null&&(recString.equals("11")||recString.equals("00")||recString.equals("10")))
		{
			AlertDialog.Builder alert = new AlertDialog.Builder(MainActivity.this);
			alert.setTitle("회원정보를 다시 입력해 주세요");
			
			if(recString.equals("11"))//이메일 체크 완료 디비 입력 완료
			{
				alert.setTitle("회원이 되신걸 환영합니다");
				alert.setMessage("회원가입완료");
				alert.setPositiveButton("확인",
				        new DialogInterface.OnClickListener() {
			        
					public void onClick(DialogInterface dialog, int id)//다음 화면으로 넘어가기 intent
			        {
						//Intent it = new Intent(MainActivity.this, 다음화면 클레스 이름.class);
						//startActivity(it);
			        }
			        });
			}
			else if(recString.equals("00"))//이메엘 중복으로 디비 입력 거부
			{
				alert.setMessage("이메일 중복");
				alert.setPositiveButton("확인", null);
			}
			else if(recString.equals("10"))//이메일 체크 통과 하지만 디비 입력 오류
			{
				alert.setMessage("디비저장오류");
				alert.setPositiveButton("확인", null);
			}				
			alert.show();
		}
		*/
	}
	
	private String jsonParserList(String recline)
	{
		try
		{
			JSONObject json = new JSONObject(recline);// 갖고온 JSON파일을 객체만드는데 사용
			JSONArray jArr = json.getJSONArray("joincheckOK");//jsp파일 안의 List배열을 선택
			String line = "";
		
			for (int i = 0; i < jArr.length(); i++)
			{	
				json = jArr.getJSONObject(i);
				String joinOK = json.getString("joinOK");
				String email = json.getString("emailOK");
				line = email+joinOK;
				Log.d("joincheckOK",line);
			}
			return line;
		} 
		catch (JSONException e)
		{
			e.printStackTrace();
			return null;
		}
	}

}
