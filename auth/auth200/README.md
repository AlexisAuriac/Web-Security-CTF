# auth200

## What it is

A website that asks for a flag.

We can access the source of the page (see source.php).

In the source we can see that it xors the input with key ```Th1s_1s_@_x0r_k3y_l0l!``` and encodes it to hex.

It compares the result to ```3c09431700451c00232d19531900026c1e2a09431f7e38075d527e1052```.

## Solution

(see solve.py)

Decode it from hex and xor it with key.

website flag: ```hard_to_crack_i_guess_lol!!!!```
challenge flag: ```BFS{1_L0v3_t0_x0r_tH1ng5_l1k3_@_p0nY!}```
