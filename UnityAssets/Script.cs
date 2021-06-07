using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Script : MonoBehaviour
{
	GameObject head;

    // Start is called before the first frame update
    void Start()
    {
	head = GameObject.Find("bone_2");
    }
    // Update is called once per frame
    void Update()
    {
	if(Input.GetMouseButtonDown(0))
	{
		SizeUp();
	}
    }
    void SizeUp()
    {
    	Vector3 scale = Vector3.zero;
    	scale.x = 1;
    	scale.y = 1;
    	head.transform.localScale += scale;
    }
}
